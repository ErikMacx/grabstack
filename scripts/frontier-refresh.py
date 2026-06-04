#!/usr/bin/env python3
"""GrabStack trawl runner — runs via Claude Code headless mode.
Supports: frontier (default), apps, learning.
Scheduled by macOS crontab (every Monday 7am + 1st of month).
"""

import subprocess
import os
import sys
from datetime import datetime

# Which trawl?
trawl = sys.argv[1] if len(sys.argv) > 1 else 'frontier'

TRAWLS = {
    'frontier': {
        'prompt_file': 'prompt.txt',
        'output_prefix': 'frontier-refresh',
        'label': 'Frontier Refresh',
    },
    'apps': {
        'prompt_file': 'apps-trawl-prompt.txt',
        'output_prefix': 'apps-trawl',
        'label': 'Apps Trawl',
    },
    'learning': {
        'prompt_file': 'learning-trawl-prompt.txt',
        'output_prefix': 'learning-trawl',
        'label': 'Learning Trawl',
    },
}

if trawl not in TRAWLS:
    print(f'Unknown trawl: {trawl}. Choose from: {", ".join(TRAWLS.keys())}')
    exit(1)

config = TRAWLS[trawl]

# Setup
date_str = datetime.now().strftime('%Y-%m-%d')
day = datetime.now().day
repo_dir = os.path.expanduser('~/grabstack')
drafts_dir = os.path.join(repo_dir, 'drafts')
logs_dir = os.path.join(repo_dir, 'logs')
output_file = os.path.join(drafts_dir, f'{config["output_prefix"]}-{date_str}.md')
error_log = os.path.join(logs_dir, 'frontier-refresh.error.log')

os.makedirs(drafts_dir, exist_ok=True)
os.makedirs(logs_dir, exist_ok=True)

# Determine cadence
if day == 1:
    cadence = 'monthly'
    steps = 'Run all five steps including full category briefs (step 3).'
else:
    cadence = 'weekly'
    steps = 'Run steps 1, 2, 4 and 5. Skip step 3 (category briefs are monthly only).'

# Read the detailed prompt
prompt_file = os.path.join(repo_dir, 'worker', 'frontier-refresh', 'src', config['prompt_file'])
try:
    with open(prompt_file) as f:
        base_prompt = f.read()
except FileNotFoundError:
    with open(error_log, 'a') as f:
        f.write(f'{date_str}: {config["prompt_file"]} not found at {prompt_file}\n')
    os.system(f'osascript -e \'display notification "{config["label"]}: prompt file missing" with title "GrabStack" sound name "Basso"\'')
    exit(1)

full_prompt = f'{base_prompt}\n\nRun the {cadence} {config["label"]} for the period ending {date_str}. {steps} Output the complete report.'

# Run Claude Code in headless mode
print(f'Running {cadence} {config["label"]} for {date_str}...')
print('This takes 3-5 minutes while Claude searches the web. Please wait.')

result = subprocess.run(
    ['/usr/local/bin/claude', '-p', full_prompt,
     '--allowedTools', 'Bash,Read,Write,Edit,WebSearch',
     '--output-format', 'text'],
    capture_output=True,
    text=True,
    cwd=repo_dir,
    timeout=1800  # 30 minute timeout
)

# Handle output — Claude Code writes the report file directly
if result.stdout.strip():
    print(result.stdout)

    # Git commit and push
    subprocess.run(['git', 'add', drafts_dir], cwd=repo_dir)
    subprocess.run(['git', 'commit', '-m', f'{config["label"]} {date_str} ({cadence})'], cwd=repo_dir)
    subprocess.run(['git', 'push'], cwd=repo_dir)
    print('Committed and pushed.')

    os.system(f'osascript -e \'display notification "{config["label"]} ready for review" with title "GrabStack" sound name "Glass"\'')
else:
    error_msg = result.stderr or 'No output produced'
    print(f'Error: {error_msg}')
    with open(error_log, 'a') as f:
        f.write(f'{date_str}: {config["label"]}: {error_msg}\n')
    os.system(f'osascript -e \'display notification "{config["label"]} failed — check logs" with title "GrabStack" sound name "Basso"\'')
