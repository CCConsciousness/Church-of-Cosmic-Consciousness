# CCC Digital Mystery School v1.15 — The Path

Replaces the old Stages page with **The Path**, a sequential, checkable curriculum for all four stages.

- Seeker: five weekly units, mapped to the published workbook’s exact chapter and lesson schedule.
- Initiate: 16 lessons INI-001–INI-016 across eight modules.
- Adept: 24 lessons A001–A024 across eight modules.
- Master: 32 lessons M001–M032 across eight modules.
- For every unit, separate reading, workbook, and reflection/application checkboxes.
- Progress bars for each stage and overall; next incomplete task; device-local storage; JSON export.
- Links open the official Google Drive books and workbooks.
- No official certification claims. App prompts are provided as guidance; the printed workbooks remain authoritative.

## GitHub Pages update
Replace `index.html`, `app.js`, `styles.css`, `sw.js`. Add `path.js` and `path-curriculum.json`.
Do not remove covers or other app assets. Existing journal and meditation data are unaffected. The old `ccc-progress` data remains stored but the new Path uses `ccc-path-checks-v1`; previous checkmarks are not automatically counted because the old placeholders did not correspond one-to-one to verified workbook activities.

## Curriculum grounding
Checked against the actual published Seeker compendium and workbook, Initiate workbook, Adept workbook, and Master compendium and workbook. Seeker Week 2–5 app reflection prompts are paraphrased suggestions, not falsely attributed as verbatim workbook questions. For each later-stage lesson, workbook inquiry text was extracted from its matching workbook where available. Always consult the source PDFs for full instructions.
