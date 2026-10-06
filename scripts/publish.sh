#!/usr/bin/env bash
# Used by the daily and weekly workflows after the build has passed:
# commit the refreshed content and push it to main. The workflow then deploys dist/.
#   scripts/publish.sh "Wire: 7 October 2026"
set -euo pipefail
msg="$1"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A src/content WIRE_NOTES.md REVIEW_NOTES.md 2>/dev/null || true
if git diff --cached --quiet; then
  echo "Nothing changed, so nothing to publish."
  echo "published=false" >> "${GITHUB_OUTPUT:-/dev/null}"
  exit 0
fi
git commit -q -m "$msg"
if ! git push -q origin HEAD:main; then
  git pull -q --rebase origin main
  npm run build
  git push -q origin HEAD:main
fi
echo "published=true" >> "${GITHUB_OUTPUT:-/dev/null}"
echo "Published: $msg"
