#!/bin/bash
# GrabStack trawl runner.
#
# Replaces scripts/frontier-refresh.py, which printed "Committed and pushed."
# after every failure and so reported three months of green lights over an
# empty pipeline. The rules here are the opposite:
#
#   - resolve PATH explicitly (cron has none; node and claude live in /usr/local/bin)
#   - prove auth BEFORE doing work, and stop if it is missing
#   - treat empty, short or error-shaped output as failure
#   - never claim success that cannot be verified
#   - shout when it breaks
#
# Usage: scripts/trawl.sh [frontier|apps|learning]

set -uo pipefail

# --- environment ----------------------------------------------------------
# Cron starts with a near-empty PATH. This was fault #3: `env: node: No such
# file or directory` for three weeks straight.
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export HOME="${HOME:-/Users/Eric}"

REPO="$HOME/grabstack"
TRAWL="${1:-frontier}"
DATE="$(date +%Y-%m-%d)"
LOG_DIR="$REPO/logs"
RUN_LOG="$LOG_DIR/trawl-$DATE-$TRAWL.log"
mkdir -p "$LOG_DIR"

case "$TRAWL" in
  frontier) PROMPT_FILE="prompt.txt";                LABEL="Frontier Refresh" ;;
  apps)     PROMPT_FILE="apps-trawl-prompt.txt";     LABEL="Apps Trawl" ;;
  learning) PROMPT_FILE="learning-trawl-prompt.txt"; LABEL="Learning Trawl" ;;
  *) echo "Unknown trawl: $TRAWL (use frontier|apps|learning)" >&2; exit 2 ;;
esac

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$RUN_LOG"; }

# Loud failure. A silent failure is what caused the stagnation, so every exit
# path that is not a verified success ends up here.
die() {
  log "FAILED: $*"
  echo "$DATE $LABEL: $*" >> "$LOG_DIR/trawl.error.log"
  osascript -e "display notification \"$LABEL FAILED: $*\" with title \"GrabStack\" sound name \"Basso\"" 2>/dev/null
  exit 1
}

cd "$REPO" || die "repo not found at $REPO"

# --- preflight: prove we can work before we start working ------------------
command -v node   >/dev/null || die "node not on PATH"
command -v claude >/dev/null || die "claude CLI not on PATH"
command -v gh     >/dev/null || die "gh CLI not on PATH"

gh auth status >/dev/null 2>&1 || die "gh not authenticated (run: gh auth login)"

# Fault #3, second form: the September runs reached Claude and got
# "Not logged in · Please run /login" — cron cannot read the OAuth credentials
# from the login keychain. An API key in the environment is the reliable path
# for unattended runs.
if [ -f "$HOME/.env.anthropic" ]; then
  # shellcheck disable=SC1091
  set -a; . "$HOME/.env.anthropic"; set +a
fi
[ -n "${ANTHROPIC_API_KEY:-}" ] || die "ANTHROPIC_API_KEY not set (put it in ~/.env.anthropic) — headless claude cannot use the keychain under cron"

PROMPT_PATH="$REPO/prompts/$PROMPT_FILE"
[ -f "$PROMPT_PATH" ] || die "prompt file missing: $PROMPT_PATH"

# Work on a fresh branch off an up-to-date main so the PR is clean.
git fetch --quiet origin main || die "git fetch failed"
git checkout --quiet main     || die "cannot checkout main"
git reset --hard --quiet origin/main || die "cannot reset to origin/main"

BRANCH="trawl/$TRAWL-$DATE"
git rev-parse --verify --quiet "$BRANCH" >/dev/null && git branch -D "$BRANCH" >/dev/null
git checkout --quiet -b "$BRANCH" || die "cannot create branch $BRANCH"

# Monthly runs go deeper; weekly runs only chase changes.
if [ "$(date +%d)" = "01" ]; then
  CADENCE="monthly"; SCOPE="Full pass: include category briefs for every category."
else
  CADENCE="weekly";  SCOPE="Focused pass: update lines, new candidates and stale flags only. Skip full category briefs."
fi

log "Starting $LABEL ($CADENCE) on branch $BRANCH"

# The freshness gate tells the trawl what to prioritise, so the most overdue
# entries get looked at first instead of whatever is topical.
node scripts/freshness.mjs > "$LOG_DIR/freshness-$DATE.txt" 2>&1 || true
OVERDUE="$(node scripts/freshness.mjs --json 2>/dev/null | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log(j.overdue.slice(0,40).map(e=>`${e.collection}/${e.slug} (${e.overdueDays}d overdue)`).join("\n"))}catch{console.log("(freshness unavailable)")}})')"

OUTPUT="$LOG_DIR/trawl-output-$DATE-$TRAWL.txt"

# --- the work -------------------------------------------------------------
claude -p "$(cat "$PROMPT_PATH")

## This run
Cadence: $CADENCE ending $DATE. $SCOPE

## Most overdue entries — prioritise these
$OVERDUE

## Required output
Do NOT write a report into drafts/ and stop. That was the old workflow and the
drafts were never applied by hand, so the site stagnated for three months.
Instead, APPLY your findings directly to the content files in src/content/**,
respecting the Zod schemas in src/content.config.ts exactly. For every entry you
touch, set 'updated' to $DATE and push 'reviewed' forward. Then run
'npm run build' to prove the content still validates, and commit.
Only change a claim you have a named, dated source for. Leave anything you could
not verify untouched and list it at the end as needing a human look." \
  --allowedTools 'Bash,Read,Write,Edit,Glob,Grep,WebSearch,WebFetch' \
  --output-format text > "$OUTPUT" 2>>"$LOG_DIR/trawl.error.log"

CLAUDE_RC=$?

# --- verification: this is the part that was missing -----------------------
[ $CLAUDE_RC -eq 0 ] || die "claude exited $CLAUDE_RC (see logs/trawl.error.log)"
[ -s "$OUTPUT" ]     || die "no output produced"

if grep -qiE "Not logged in|Please run /login|Invalid API key|authentication_error" "$OUTPUT"; then
  die "claude is not authenticated — check ANTHROPIC_API_KEY"
fi

if [ "$(wc -c < "$OUTPUT")" -lt 200 ]; then
  die "output implausibly short ($(wc -c < "$OUTPUT") bytes) — treating as failure"
fi

# The real test of success: did the content actually change?
if git diff --quiet HEAD -- src/content && [ -z "$(git status --porcelain src/content)" ]; then
  log "No content changes — nothing to ship. Not opening a PR."
  osascript -e "display notification \"$LABEL ran, found nothing to change\" with title \"GrabStack\"" 2>/dev/null
  git checkout --quiet main && git branch -D "$BRANCH" >/dev/null 2>&1
  exit 0
fi

# Content must still validate, or we are shipping a broken build.
npm run build >>"$RUN_LOG" 2>&1 || die "content changed but the build FAILED — not opening a PR"

git add -A src/content
git -c user.name="GrabStack Trawl" -c user.email="eric@tcel.com" \
    commit --quiet -m "$LABEL $DATE ($CADENCE)" || die "commit failed"
git push --quiet -u origin "$BRANCH" || die "push failed"

CHANGED="$(git diff --name-only origin/main...HEAD -- src/content | wc -l | tr -d ' ')"

PR_URL="$(gh pr create \
  --title "$LABEL $DATE ($CADENCE)" \
  --body "Automated $CADENCE $LABEL.

**$CHANGED content files changed.** Merging this deploys to grabstack.com.

Freshness before this run:
\`\`\`
$(cat "$LOG_DIR/freshness-$DATE.txt")
\`\`\`

<details><summary>Trawl notes and unverified items</summary>

\`\`\`
$(tail -c 6000 "$OUTPUT")
\`\`\`
</details>" \
  --base main --head "$BRANCH" 2>&1)" || die "gh pr create failed: $PR_URL"

log "SUCCESS: $CHANGED files changed — $PR_URL"
osascript -e "display notification \"$LABEL: $CHANGED files changed, PR open for review\" with title \"GrabStack\" sound name \"Glass\"" 2>/dev/null
