#!/usr/bin/env bash
# Fail if a refresh changed any file outside the paths it is allowed to touch.
#   scripts/guard_changes.sh '<extended regex of allowed paths>'
set -euo pipefail
allowed="$1"
changed=$(git status --porcelain --untracked-files=all | sed -E 's/^.{3}//; s/.* -> //')
bad=$(printf '%s\n' "$changed" | grep -v '^$' | grep -vE "$allowed" || true)
if [ -n "$bad" ]; then
  echo "::error::This run changed files it is not allowed to touch:"
  printf '%s\n' "$bad"
  exit 1
fi
echo "Changed files are all within the allowed set:"
printf '%s\n' "$changed"
