# Learn AI Coding with Phoebe

Six 45-minute sessions, single track, and **one real feature** you ship through all of them.

One well-known study measured experienced developers as nineteen percent slower with AI, while
those same developers believed they had been twenty percent faster. Another measured fifty-six
percent faster. Both are honest, and the researchers behind the first have since published a
partial walk-back of their own headline. This course teaches you to read that.

**Live:** https://phoebefu6.github.io/learn-ai-coding-with-phoebe/

## The sessions

| # | Session | What your feature gains |
|---|---------|--------------------------|
| 1 | The honest baseline | A way to read the evidence, and your own measured starting point |
| 2 | Context is everything | A context pack, and a habit of clearing between tasks |
| 3 | The review problem | A reusable checklist for reading a diff |
| 4 | Security and supply chain | A security pass and a permission posture |
| 5 | Build the thing | The feature built, plan-first, in whatever tool you have |
| 6 | Shipping safely | The control system that turns speed into shipped value |

## The playground really executes

`assets/runner.js` compiles and runs real JavaScript against a real test suite in the browser.
Five tasks: `median`, `formatBytes`, `parseRange`, `retry`, `slugify`. Every pass and fail is an
actual result.

| Rung | Tasks passing first try |
|---|---|
| a bare ask | **0/5** |
| + write the spec first | **5/5** |
| **accept everything, shipped suite** | **5/5 green, and all five are wrong** |
| the same code, tests written first | **1/5** |

The four real flaws the trap ships: no clamp so a huge byte count returns "undefined"; reversed
ranges silently return empty; a retry that calls your API one extra time; a slug with a trailing
dash. All of them pass the shipped tests.

That is not invented. Tests generated after faulty code detect **14 percent** of faults versus
**25 percent** for tests generated independently, because "incorrect implementations and tests are
mutually consistent, masking defects rather than revealing them."

## The evidence, labelled

Every number in this course carries who funded it and what it actually measured.

- **METR 2025:** 16 developers, 246 tasks, forecast 24% faster, felt 20% faster, measured **19%
  slower**. Independent.
- **METR 2026:** a larger follow-up whose confidence intervals **cross zero**, and the authors'
  statement that developers are likely faster now. Taught together with the headline, because a
  result quoted without its correction is a talking point rather than evidence.
- **Peng et al. 2023:** 55.8% faster. Vendor-funded, and a single greenfield toy task.
- **Perry et al., ACM CCS 2023:** people using AI wrote less secure code and were more confident
  it was secure. Also the hopeful half: those who trusted it less and engaged more with their
  prompts produced fewer vulnerabilities.
- **Slopsquatting:** 205,474 unique hallucinated package names. The famous 30,000-download case
  was a researcher's benign proof of concept, and this course says so.

Full source map with every URL and a dated do-not-state-as-fact list:
[`materials/official-course-map.md`](materials/official-course-map.md).

Pairs with [Learn AI QA with Phoebe](https://phoebefu6.github.io/learn-ai-qa-with-phoebe/), where
the same lesson arrives from the other side with real mutation testing.

by Phoebe Fu · part of [Learn with Phoebe](https://phoebefu6.github.io/learn-with-phoebe/)
