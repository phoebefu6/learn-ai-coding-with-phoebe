# AI + Coding - official source map and coverage

Verified 2026-08-25. Every fact on a course page traces to a URL below.

## URL migrations to know about

- `docs.claude.com/en/docs/claude-code/*` now 301s to `code.claude.com/docs/en/*`.
- `developers.openai.com/codex/*` now 308s to `learn.chatgpt.com/codex/*`.
- `skills.github.com` no longer serves a catalog; it points to `learn.github.com/skills`.
- `anthropic.com/learn` 308s to `academy.claude.com`.

Any guide still using the old paths predates this year.

## THE SPINE: the honest state of the evidence, including a result the researchers themselves
## partly walked back

This is the course's reason to exist. Every other course teaches the tool. None of them teach
that the evidence is genuinely contested and moving.

### The famous slowdown finding

METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity",
July 2025. **16 experienced developers, 246 tasks**, on mature repositories averaging 22k+ stars
and over a million lines, which they had contributed to for years. Tooling was primarily Cursor
Pro with Claude 3.5 and 3.7 Sonnet.

The three numbers that make the point, verbatim from the abstract: developers **forecast a 24%
speedup**, **estimated afterwards that they had been 20% faster**, and were measured **19% slower**.
Expert forecasters predicted 38 to 39% speedups. https://arxiv.org/abs/2507.09089

The confidence interval, **+2% to +39%**, is not in the paper. It is stated on METR's own follow-up
page and must be attributed there. https://metr.org/blog/2026-02-24-uplift-update/

### The update that most courses will miss, and this one must not

METR published a design update on **2026-02-24** reporting a larger follow-up: **57 developers,
143 repositories, 800+ tasks**, ten of whom were in the original study.

- For the original developers who returned: **-18%, confidence interval -38% to +9%**.
- For newly recruited developers: **-4%, confidence interval -15% to +9%**.
- **Both intervals cross zero.**
- METR names the cause as severe **selection bias**: developers refused to work without AI, and
  self-selected their tasks. "the true speedup could be much higher among the developers and tasks
  which are selected out of the experiment."
- METR's current position, verbatim: **"Based on conversations with study participants, we believe
  it is likely that developers are more sped up from AI tools now - in early 2026 - compared to our
  estimates from early 2025."**
- "we are working on changes to the design of our study."

https://metr.org/blog/2026-02-24-uplift-update/

**Teach the 19% figure with this update attached.** Quoting the 2025 headline alone is now stale,
and the researchers are the ones saying so. This is the single best teaching moment in the course:
what it looks like when honest researchers revise in public.

### The numbers pointing the other way, with their conflicts declared

| Study | Finding | Independence | The catch |
|---|---|---|---|
| Peng et al. 2023, GitHub Copilot | treatment group **55.8% faster** | **vendor-funded**, Microsoft Research publication | a single greenfield toy task: implement an HTTP server in JavaScript. Nothing like a real codebase |
| Cui et al., *Management Science*, published 2026-02-27 | **+26.08% completed tasks (SE 10.3%)**, 4,867 developers across Microsoft, Accenture and a Fortune 100 firm | **vendor-adjacent** - two Microsoft Research authors | the paper's own caveat: "each experiment is noisy and results vary across experiments". Less experienced developers gained most |
| Vaithilingam et al., CHI 2022, 24 participants | **no** improvement in completion time or success rate, yet most participants **preferred** Copilot | independent, academic | the earliest clean demonstration of the preference-versus-performance gap |

https://arxiv.org/abs/2302.06590 · https://pubsonline.informs.org/doi/10.1287/mnsc.2025.00535 ·
https://dl.acm.org/doi/10.1145/3491101.3519665

**The reconciliation to teach:** 55.8% on a toy task and a measured slowdown on a million-line
codebase you already know are both true. The gap between them is the course.

### DORA, on what happens to a whole team

2025 report, "State of AI-assisted Software Development", ~5,000 professionals: **90% use AI at
work**, over 80% believe it increased their productivity, and **30% report little or no trust in
the code it generates.** The pivot from 2024: "we observe a positive relationship between AI
adoption on both software delivery throughput and product performance... However, AI adoption does
continue to have a **negative relationship with software delivery stability**."

The mechanism, verbatim and worth a whole session: "AI accelerates software development, but that
acceleration can expose weaknesses downstream. Without robust control systems, like strong
automated testing, mature version control practices, and fast feedback loops, an increase in change
volume leads to instability." And the framing line: **"AI doesn't fix a team; it amplifies what's
already there."**
https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report ·
https://dora.dev/dora-report-2025/

### What developers actually report

Stack Overflow Developer Survey 2025, **49,000+ respondents**, published 2025-12-29:
- **80%** now use AI tools in their workflow.
- **Trust in AI accuracy fell from 40% to 29%.** Positive favorability fell from 72% to 60%.
- The number one frustration, cited by **45%**: **"AI solutions that are almost right, but not
  quite."**
- **66% say they spend more time fixing almost-right AI-generated code.**
- 75% would still ask another person when they do not trust the answer.

https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/

## Security, and this is not optional material

### AI-generated code contains vulnerabilities at a measurable rate

Pearce et al., "Asleep at the Keyboard?", IEEE S&P 2022. 89 scenarios, **1,689 generated programs,
roughly 40% found vulnerable** against MITRE's Top 25 CWEs. Independent, NYU and Calgary.
https://arxiv.org/abs/2108.09293

### Humans using AI write less secure code AND believe the opposite

Perry, Srivastava, Kumar and Boneh, ACM CCS 2023. Stanford, independent. 47 participants, five
security tasks, three languages.
- Signing task: **3%** of AI-assisted participants wrote a secure solution versus **21%** of the
  control group. Sandboxed-directory task: **12%** versus **29%**.
- The over-trust finding, verbatim: participants with AI access "were more likely to believe that
  they wrote secure code than those without access."
- **The hopeful finding, and the one to build a habit on:** participants "who trusted the AI less
  and engaged more with the language and format of their prompts... provided code with fewer
  security vulnerabilities."
https://arxiv.org/abs/2211.03622

### Prompt injection in coding agents is documented, with CVEs

| Incident | CVE / severity | What happened |
|---|---|---|
| **CamoLeak**, Copilot Chat | CVE-2025-59145, **CVSS 9.6** | instructions hidden in **pull request descriptions**, executed on the reviewer's behalf, private source exfiltrated through GitHub's own image proxy. Mitigated by disabling image rendering in Copilot Chat |
| **CurXecute**, Cursor | CVE-2025-54135, CVSS 8.6 | injection via a Slack-connected MCP server rewrote Cursor's global `mcp.json` before the user could reject the edit. Fixed in Cursor 1.3 |
| **MCPoison**, Cursor | CVE-2025-54136 | an MCP config approved **once** could later have malicious commands swapped in with no second prompt |
| **DuneSlide**, Cursor | CVE-2026-50548 / 50549, **CVSS 9.8** | zero-click sandbox escape to host RCE, via injected instructions arriving in an MCP response, a fetched web page, or a project file. Fixed in Cursor 3.0 |

**The pattern, and it is the whole lesson:** in every one of these, the attacker never typed into
the developer's editor. They planted instructions in something the agent read on the developer's
behalf.
https://www.legitsecurity.com/blog/camoleak-critical-github-copilot-vulnerability-leaks-private-source-code ·
https://research.checkpoint.com/2025/cursor-vulnerability-mcpoison/ ·
https://thehackernews.com/2026/07/critical-cursor-flaws-could-let-prompt.html

### Hallucinated packages, and the supply-chain risk they create

Spracklen et al., USENIX Security 2025. **576,000 code samples, 16 models.** Package hallucination
rates "at least **5.2% for commercial models and 21.7% for open-source models**", producing
**205,474 unique hallucinated package names**. https://arxiv.org/abs/2406.10279

Still true in 2026: Socket.dev, 199,845 responses across five frontier models generated in April
2026, hallucination rates **4.62% to 6.10%**. 127 hallucinated names were shared across all five
models, and **53 of those were still available to register** at review time.
https://socket.dev/blog/slopsquatting-targets-across-frontier-llms

**The documented case, stated carefully.** A researcher noticed models repeatedly hallucinating a
PyPI package named `huggingface-cli`, registered the empty name as a proof of concept, and it
received **over 30,000 genuine downloads in three months** - and Alibaba had copy-pasted the
hallucinated install command into a public repository's README. This was a benign researcher
proof of concept. **Do not present it as a successful attack**, because no large-scale breach has
been publicly attributed to slopsquatting.
https://www.lasso.security/blog/ai-package-hallucinations

## What the vendors themselves tell you not to do

These are the vendors' own words, and the course quotes them because a vendor writing this down is
worth more than any independent warning.

**Anthropic**, https://code.claude.com/docs/en/security and
https://code.claude.com/docs/en/permission-modes
- "Claude Code only has the permissions you grant it. **You're responsible for reviewing proposed
  code and commands for safety before approval.**"
- On auto mode, which is now the built-in starting mode on Pro, Max and Team plans: "Auto mode
  reduces permission prompts but **does not guarantee safety**. Use it for tasks where you trust
  the general direction, not as a replacement for review on sensitive operations."
- On the bypass mode: "Only use this mode in isolated environments like containers, VMs, or dev
  containers without internet access", and the sentence that belongs on a slide:
  **"`bypassPermissions` offers no protection against prompt injection or unintended actions."**
- Its four best practices for untrusted content: review suggested commands before approval; avoid
  piping untrusted content directly to Claude; verify proposed changes to critical files; use VMs
  when interacting with external web services.
- A real gotcha: "Trust verification is disabled when running non-interactively with the `-p` flag."

**GitHub**, https://docs.github.com/en/copilot/responsible-use/agents
- "Copilot may not identify all of the problems that are present in code, especially where changes
  are large or complex", and it "may highlight problems in reviewed code that do not exist."
- "You should always carefully review and test code generated by Copilot."
- "Copilot code review should be supplemented with careful human code review" - it should
  "supplement human reviews, not replace them."
- "You are ultimately responsible for the commands executed by Copilot CLI."
- Cloud agent: "Draft pull requests created by Copilot cloud agent must be reviewed and merged by
  a human." https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent

**OpenAI**, https://learn.chatgpt.com/docs/agent-approvals-security
- `danger-full-access` is labelled **"not recommended"**. "Use caution when enabling network access
  or web search in Codex. Prompt injection can cause the agent to fetch and follow untrusted
  instructions." Default: "the agent runs with network access turned off."

**All three agree on one sentence: you remain responsible for reviewing the output, and no autonomy
mode removes that.**

## Verified tool reality

| Tool | Current shape | Pricing | The catch |
|---|---|---|---|
| Claude Code | agentic: subagents, hooks, headless `-p`, Agent SDK. Six permission modes | Free $0, Pro $17/mo annual, Max 5x $100, Max 20x $200 | numeric rate limits are **not published**, only the structure (rolling 5-hour plus weekly). Bash sandbox is macOS Seatbelt or Linux isolation; **native Windows unsupported**. Real cost benchmark from the docs: "around $13 per developer per active day and $150-250 per developer per month" |
| GitHub Copilot | agent mode in IDE, plus **Copilot Cloud Agent** (renamed) which opens a PR you review | **billing changed 2026-06-01** from premium requests to **GitHub AI Credits**, 1 credit = $0.01. Free, Pro $10, Pro+ $39, Max $100, Business $19/seat, Enterprise $39/seat | **signups paused** for Student, Pro, Pro+ and Max as of the June 2026 changelog, and for Business on Free/Team orgs since 2026-04-22. Check before running a cohort. Cloud agent has a hard **59-minute session cap** |
| Cursor | Plan Mode (Shift+Tab), cloud agents in isolated VMs, unlimited parallel agents | Pro $20, Pro Plus $60, Ultra $200, Teams $40/user | **pricing model changed** from request counting to two token pools. "Composer" is now both a mode and a model name, which confuses everyone |
| OpenAI Codex | CLI with `codex exec` for CI, IDE extension, cloud agent triggered from web, GitHub, GitLab, Linear or Slack. GPT-5.6 family | bundled into ChatGPT plans: Free, Go $8, Plus $20, Pro $100/$200, Business $20/user | **the name has meant three different things.** The 2021 completion models died 2023-03-23; even `codex-mini-latest` was removed **2026-02-12**. Current Codex is a product line, not a model. It is the only one of the four publishing hard numeric rate limits |

https://code.claude.com/docs/en/overview · https://code.claude.com/docs/en/costs ·
https://docs.github.com/en/copilot/get-started/plans ·
https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/ ·
https://cursor.com/docs/models-and-pricing · https://learn.chatgpt.com/codex/pricing ·
https://developers.openai.com/api/docs/deprecations.md

## Duplication and churn: what the code itself shows

GitClear, February 2025, **211 million changed lines** authored 2020 to 2024. Independent of the AI
vendors, though it sells code-analytics tooling.

| Metric | 2020 | 2024 |
|---|---|---|
| Moved lines (the signature of refactoring) | 24.1% | **9.5%** |
| Copy/pasted lines | 8.3% | **12.3%** |
| Churn | 3.1% | 5.7% |

"2024 marked the first year GitClear has ever measured where the number of 'Copy/Pasted' lines
exceeded the count of 'Moved' lines." Commits containing a 5-plus-line duplicate block went
**0.45% in 2022 to 6.66% in 2024**.
https://gitclear-public.s3.us-west-2.amazonaws.com/GitClear-AI-Copilot-Code-Quality-2025.pdf

GitClear also names a mechanical driver in the same report: "the most popular code assistant of
2024 was limited to roughly 10 files that could fit in its context window." That is the link
between the context limits in the section below and the duplication in the table above - an
assistant that cannot see your existing helper writes a new one.

## Context loss in long sessions, documented by the vendor

From https://code.claude.com/docs/en/costs: Claude Code "sends your full conversation with every
request... so a one-line question in a session that has been open all day still draws usage for the
whole conversation." Auto-compaction "summarizes conversation history when approaching context
limits", which is lossy by design. "Use `/clear` to start fresh when switching to unrelated work.
Stale context wastes tokens on every subsequent message." The vendor-diagnosed cause of runaway
spend: "usually traces back to long sessions that were never cleared."

## Official learning paths to map coverage against

- Microsoft Learn "GitHub Copilot Fundamentals Part 1 of 2" - **317 min, 9 modules**
  https://learn.microsoft.com/en-us/training/paths/copilot/
- Microsoft Learn "Get started with AI-assisted development" - **479 min, 6 modules**
  https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/
- Microsoft Learn "Introduction to vibe coding" - **80 min, 9 units**
  https://learn.microsoft.com/en-us/training/modules/introduction-vibe-coding/
- GitHub Learn "Getting Started with GitHub Copilot" - "less than one hour"
  https://github.com/skills/getting-started-with-github-copilot
- DeepLearning.AI "Claude Code: A Highly Agentic Coding Assistant" - **2 h, 10 lessons**, taught by
  Anthropic's Head of Technical Education
  https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/
- Coursera "Claude Code: Software Engineering with Generative AI Agents" (Vanderbilt) - **5 hours**
  https://www.coursera.org/learn/claude-code
- GitHub Copilot certification, **exam GH-300**, 100 minutes, proctored
  https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/

**The two gaps this course exploits.** Only one course found teaches more than one assistant side
by side. And **nobody teaches the evidence section above** - not the METR result, not its walk-back,
not the security studies, not the trust decline. Every official path teaches the tool surface.

## Do not state as fact (unverified)

GitClear's 2026 "Maintainability Gap" figures - that page 403s and the numbers exist only in search
snippets; the 2025 report is fully verified, use it instead. DORA 2026's "verification tax"
definition and J-curve numbers - the report's existence, version and date are verified, its contents
are not. DORA 2025's exact effect sizes - direction only is published, the PDF is gated. DORA 2024's
-1.5% / -7.2% / -2.6% figures - these come from RedMonk quoting the report, not a DORA page, and
RedMonk carries a correction that the sample was ~3,000 not 39,000. The sample size for the 55.8%
Copilot study - the abstract does not state it, so cite the effect and not an N. Claude Code's
numeric usage limits - only the structure is published; any "X hours per week" claim is folklore.
The Copilot duplication-filter threshold in lexemes or characters - widely repeated, not on the
docs page. *Doe v. GitHub* status - say "on appeal, no ruling as of August 2026" and no more.
Any claim that a real slopsquatting attack succeeded at scale.

## Simulator canon - VERIFIED IN-BROWSER 2026-08-25

`assets/code-live.js` with `assets/runner.js`. **The code on the page is really compiled and really
executed** against a real test suite in the browser. Every pass and fail is the actual result.
What the levers model is which code a differently-worded ask tends to produce.

Five real tasks: `median`, `formatBytes`, `parseRange`, `retry`, `slugify`. Each ships with a real
suite and three real implementations.

| Rung | Tasks passing first try |
|---|---|
| a bare ask | **0/5** |
| + write the spec first | **5/5** |
| + give it the surrounding code | 5/5, and the convention warning clears |
| + tests written first | 5/5 |

**The trap, and it is the point of the whole thing:**

| Accept everything, never read the diff | Result |
|---|---|
| against the suite as shipped | **5/5 green, and all five implementations are wrong** |
| the same code, with tests written first | **1/5** |

The five real flaws the trap ships: `formatBytes` has no clamp so a huge number returns
"undefined"; `parseRange` silently returns an empty array for reversed ranges; `retry` is off by
one and calls your API one extra time; `slugify` leaves a trailing dash on any title ending in
punctuation. Each one passes the shipped tests.

**This is empirically grounded, not invented.** Konstantinou, Tambon and Papadakis 2026 found that
tests generated after faulty code detect **14%** of faults versus **25%** for tests generated
independently, because "incorrect implementations and tests are mutually consistent, masking
defects rather than revealing them." https://arxiv.org/abs/2607.05139 The trap in this simulator is
that finding, made clickable.

**The metric saturates on purpose.** After the spec lever the score sits at 5/5 and the later
levers do not move it. That is the honest behaviour and the page says so: a green headline number
stops being informative early, which is exactly why the trap can sit at 5/5 while shipping four
real defects. It hands directly to the AI + QA course, whose playground scores the same kind of
suite with real mutation testing.

**Honesty rail for the pages:** the execution is real, the failures are real, and the mapping from
lever to code variant is a teaching model of what better prompts tend to produce. It is not a
measurement of any particular model.
