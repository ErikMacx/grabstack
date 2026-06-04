#!/bin/bash
# GrabStack Frontier Refresh — runs via Claude Code headless mode
# Scheduled by macOS launchd (every Monday 7am + 1st of month)

DATE=$(date +%Y-%m-%d)
DAY=$(date +%d)
REPO_DIR="$HOME/grabstack"
PROMPT_FILE="$REPO_DIR/worker/frontier-refresh/src/prompt.txt"
OUTPUT_FILE="$REPO_DIR/drafts/frontier-refresh-${DATE}.md"

# Determine cadence
if [ "$DAY" = "01" ]; then
  CADENCE="monthly"
  STEPS="Run all five steps including the full category briefs (step 3)."
else
  CADENCE="weekly"
  STEPS="Run steps 1, 2, 4 and 5. Skip step 3 (category briefs are monthly only)."
fi

# Create directories if needed
mkdir -p "$REPO_DIR/drafts"
mkdir -p "$REPO_DIR/logs"

# Run Claude Code in headless mode
cd "$REPO_DIR"
claude -p --allowedTools "Bash,Read,Write,Edit,WebSearch" "$(cat "$PROMPT_FILE")

Run the ${CADENCE} Frontier Refresh for the period ending ${DATE}. ${STEPS} Output the complete Refresh Report." --output-format text > "$OUTPUT_FILE" 2>> "$REPO_DIR/logs/frontier-refresh.error.log"

# If output was generated, commit, push, and notify
if [ -s "$OUTPUT_FILE" ]; then
  git add "$OUTPUT_FILE"
  git commit -m "Frontier Refresh — ${DATE} (${CADENCE}, automated)"
  git push

  # macOS notification
  osascript -e "display notification \"Frontier Refresh report is ready for review in drafts/\" with title \"GrabStack\" sound name \"Glass\""
else
  echo "${DATE}: Claude Code produced no output" >> "$REPO_DIR/logs/frontier-refresh.error.log"
  osascript -e "display notification \"Frontier Refresh failed — check logs\" with title \"GrabStack\" sound name \"Basso\""
fi
