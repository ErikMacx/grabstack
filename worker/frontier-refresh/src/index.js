const REFRESH_PROMPT = `You are running the Frontier Refresh for GrabStack, a curated AI field guide at grabstack.com, curated by Eric McLean. Frontier is the hero section: the living coalface of AI tools, models and software. Your job is to research what has changed, draft updates, surface new candidates and flag anything stale, then present it all as a structured review queue for editorial sign-off. Nothing auto-publishes. Speed first, then accuracy.

THE DYNAMITE TEST (inclusion criteria)

A company or product belongs on the Frontier when it passes most of these six criteria:

1. New capability, not new packaging. It extends what AI can actually do, or does it materially better, cheaper or faster than was possible a few months ago. Dynamite is new chemistry, not a fancier pickaxe. A wrapper with a nice UI alone fails this.
2. It changes the game for its domain. Practitioners have to respond: adopt it, defend against it, or rethink how they work. Mining is never the same after dynamite arrives.
3. It is contested. Reasonable people argue about it: breakthrough or bubble, safe or reckless, durable or doomed. The one-line test: would its arrival in the town start an argument? If everyone just shrugs and uses it, it is an App, not a Frontier entry. This is where Frontier touches the Landscape (the macro debates).
4. It carries opportunity and risk together. A true frontier entry opens new possibilities and introduces new hazards (capability, safety, cost, dependency). Both are worth flagging.
5. It is moving. Actively developing, sitting in the ragged-edge zone of impressive but unproven. The moment something is mature and settled, it graduates out of Frontier to the Capitals or to the Apps catalogue.
6. It matters to the operator. Someone actually building with AI needs to know it to do their job well. Relevance, not mere novelty.

Via negativa (excluded): no thin wrappers, no me-too clones, nothing mature and settled. This test keeps Frontier lean and prevents it sliding into a second copy of Apps.

Distinction: a Frontier company is usually the outsider bringing the dynamite (the challenger reshaping the town). A Frontier product can also come from a Capital (a lab shipping a genuinely new model or agent). Frontier is defined by the edge, wherever it originates.

CATEGORIES TO SCAN

LLMs and Foundation Models, Coding Agents, Image Generation, Video Generation, Voice and Audio, Search and Research, Work Agents and Automation, Assistants and Companions, Writing and Content, Design, Data and Analytics, Developer Tools and Frameworks, Presentation and Productivity.

Update this list if categories emerge or merge.

STEPS

Step 1: category scan.
For each category, search for developments in the relevant period (7 days for weekly, 30 days for monthly). Focus on: new releases, capability jumps, pricing changes, major updates, controversies, benchmarks, shutdowns, acquisitions, regulatory actions. Bias to primary sources: the labs' own announcements, arXiv, Hugging Face, GitHub, the serious analysts. Speed: search broadly first, then dig into what looks material.

Step 2: per-company update.
For each company or product currently tracked on the Frontier:
- Search for the latest material change.
- Draft a concise update line: what changed, when, named source.
- Verify the product link still resolves.
- If there is no material change, write: "No material change since [last updated date]." Never invent an update to fill the slot. A confident, invented update is worse than silence.

Step 3: category brief (monthly cycles only).
For each category, draft an updated synthesis covering:
- Risks currently live in this space.
- Trends (direction of travel).
- Decisions practitioners face right now.
- Ideas worth watching (early, unproven but interesting).
- Curiosities (odd signals, things that do not fit the pattern yet).
- Opportunities (where the openings are).
Named sources throughout. Dated.

Step 4: new candidates.
Surface any company or product from the research that is NOT currently tracked but passes the Dynamite Test. For each, provide:
- Name, what it does, why it passes the test (which criteria and why).
- A proposed stub: company, product description, latest update, product link.

Step 5: graduation and pruning.
Flag any currently tracked entry that:
- Has become mature and settled (propose: graduate to Apps or Capitals).
- Has gone dead or been shut down (propose: move to Cemetery).
- Is past its review-by date with no recent development (flag: stale, needs attention).

OUTPUT FORMAT

Present the results as a structured Refresh Report in this order:
1. Headlines: a short summary of the most significant changes this cycle (3-5 lines).
2. Per category: the brief (monthly) or a one-line status (weekly), then the per-company updates, then any new candidates, then any graduations.
3. Stale list: entries past their review-by with no development.
4. Dead links: any product links that no longer resolve.
5. Proposed verdicts: for any entry where the GrabStack editorial call should change, draft the proposed new verdict clearly marked as a proposal for sign-off.

GUARDRAILS (non-negotiable)

- Sourced or it does not ship. Every factual claim carries a named source and a date. Unsourced claims are marked [unverified] and flagged.
- No confabulation. If nothing happened, say nothing happened. Never manufacture an update.
- Verdicts are proposals. Draft the GrabStack judgment; the editor approves or edits. The verdict never auto-publishes.
- Date everything. Every update line carries a date. Every brief carries "as of [date]" and a review-by.
- Links carry ?ref=grabstack. All outbound product links use the ref tag.`;

export default {
  async scheduled(event, env, ctx) {
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const isMonthly = now.getDate() === 1;
      const cadence = isMonthly ? 'monthly' : 'weekly';
      const cadenceLabel = isMonthly
        ? 'Monthly (full category briefs + update lines + candidates)'
        : 'Weekly (update lines + new candidates + stale flags)';

      const stepsNote = isMonthly
        ? 'Run all steps including the full category briefs (step 3).'
        : 'Run steps 1, 2, 4 and 5. Skip step 3 (category briefs are monthly only).';

      const userMessage = `Run the ${cadence} Frontier Refresh for the period ending ${dateStr}. ${stepsNote} Output the complete Refresh Report.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 16000,
          system: REFRESH_PROMPT,
          messages: [{ role: 'user', content: userMessage }],
          tools: [{ type: 'web_search_20250305', name: 'web_search' }]
        })
      });

      if (!response.ok) {
        console.error('Claude API error:', response.status, await response.text());
        return;
      }

      const data = await response.json();

      const report = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');

      if (!report.trim()) {
        console.error('Empty report returned from Claude API');
        return;
      }

      const issueBody = [
        '# Frontier Refresh Report',
        '',
        `**Date:** ${dateStr}`,
        `**Cadence:** ${cadenceLabel}`,
        '',
        '---',
        '',
        report,
        '',
        '---',
        '',
        '*Review this report. Approve, edit or reject each section, then take approved updates to Claude Code to commit. Close this issue when done.*'
      ].join('\n');

      const issueResponse = await fetch(
        `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'GrabStack-Frontier-Refresh'
          },
          body: JSON.stringify({
            title: `Frontier Refresh — ${dateStr} (${cadence})`,
            body: issueBody,
            labels: ['frontier-refresh']
          })
        }
      );

      if (!issueResponse.ok) {
        console.error('GitHub Issue creation failed:', await issueResponse.text());
        return;
      }

      console.log(`Frontier Refresh ${cadence} report created as GitHub Issue for ${dateStr}`);

    } catch (err) {
      console.error('Frontier Refresh Worker error:', err);
    }
  }
};
