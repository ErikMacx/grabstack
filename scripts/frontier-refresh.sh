#!/bin/bash
DATE=$(date +%Y-%m-%d)
DAY=$(date +%d)
REPO_DIR="$HOME/grabstack"
OUTPUT_FILE="$REPO_DIR/drafts/frontier-refresh-${DATE}.md"
mkdir -p "$REPO_DIR/drafts" "$REPO_DIR/logs"

if [ "$DAY" = "01" ]; then
  CADENCE="monthly"
  STEPS="Include full category briefs for every category."
else
  CADENCE="weekly"
  STEPS="Focus on update lines, new candidates and stale flags. Skip full briefs."
fi

cd "$REPO_DIR"

claude -p "You are running the GrabStack Frontier Refresh. Search the web for the most important AI developments in the last 7 days across: LLMs, Coding Agents, Image Generation, Video Generation, Voice and Audio, Search and Research, Work Agents, Assistants, Writing and Content, Design, Data and Analytics, Developer Tools. For each category: what happened, who, when, source. Apply the Dynamite Test: flag anything that is a genuine new capability, changes the game, is contested, carries opportunity and risk, and matters to operators. Flag stale entries. Output: headlines first, then per-category findings, then new candidates, then stale items. Every claim needs a named source and date. Never invent an update. This is the ${CADENCE} refresh ending ${DATE}. ${STEPS}" --allowedTools 'Bash,Read,Write,Edit,WebSearch' --output-format text > "$OUTPUT_FILE" 2>> "$REPO_DIR/logs/frontier-refresh.error.log"

if [ -s "$OUTPUT_FILE" ]; then
  git add "$OUTPUT_FILE"
  git commit -m "Frontier Refresh ${DATE} (${CADENCE})"
  git push
  osascript -e 'display notification "Frontier Refresh ready for review" with title "GrabStack" sound name "Glass"'
else
  osascript -e 'display notification "Frontier Refresh failed" with title "GrabStack" sound name "Basso"'
fi
