# ESP3 Mastery / Ruồi Lùn

A static International Business study website. Open `index.html` through a local web server or publish the complete folder with GitHub Pages. No framework, build step, external fonts or installation is required.

## Study modes

- Ten Units: theory, vocabulary, flashcards, gap-fill, short answers and essay preparation.
- Flashcards: 469 terms, persistent per-term Unlearned / Review / Remembered status, unfinished learning queues, per-Unit resume, progress-aware shuffle and a clickable vocabulary tracker. All Units uses the same statuses.
- Short answers: 65 questions with stable references, model answers, explanations and exact related-theory links. The existing legacy 40-word format remains separate from Final practice.
- Midterm Review: the existing Unit 1, 2, 3, 4 and 9 worksheets.
- Final Exam Review: vocabulary and 20 visible-word-bank activities across Units 1–10; 40 applied cases and 24 theory concepts across Units 2, 4, 5, 6, 7 and 8; four lecturer writing topics; three exam-style practice sets.
- Theory ↔ Practice: target the relevant concept and return to the original question with the current response and reveal state. The return context clears when consumed or when leaving the relevant theory route.
- Progress: legacy course progress and Final Review are displayed separately. Final completion uses explicit reviewed/completed actions, not page visits.

## Data and persistence

`data.js` contains the original course digest. `final-data.js` contains Final Review, source metadata, canonical cases, theory mappings and supplementary legacy Q&A explanations. Generated practice is original and labelled separately from textbook material. Known textbook contradictions are noted; current sources are identified separately.

Progress is stored locally in `esp3-mastery-state-v1`. Existing `termStatus` keys (`unit-N:index`) are retained; the unchanged vocabulary order keeps them compatible. `flashcardResumeByUnit` is an additive extension and stores term keys, not positional resume indices. Displaying, flipping or navigating cards does not change mastery. Explicit Review / Remembered actions do. Reset Progress clears course progress, Final progress and flashcard resume. Progress does not sync across devices and can be removed by clearing browser storage.

## Files

The project root contains `index.html`, `app.js`, `styles.css`, `data.js`, `final-data.js`, `mascots.js`, `404.html`, `.nojekyll`, six `fly-*.webp` mascot assets and `donate-phuoc-nguyen.png`. The Donate image is in the root, not an `assets/` directory. Mascots use the supplied WebP images. `app_only_changes.patch` is an existing historical patch, not the current complete implementation.

## GitHub Pages

Upload the contents of this project folder to the repository root. For branch-based Pages, select the appropriate branch and `/ (root)` in repository Pages settings. The supplied `deploy-pages.yml` remains in the project root and therefore is **not an active GitHub Actions workflow**. If the repository is configured to use Actions, a workflow must be installed under `.github/workflows/`; no deployment setting or active workflow is assumed by this package. Existing placement is preserved because the repository's live deployment configuration is unavailable.

Keep `.nojekyll` and all runtime assets. CSS/JS query versions in `index.html` are bumped when their assets change. Do not upload a second nested copy of the project folder.

## Known limitation

The old timed Test Mode code is disconnected from the active render flow. It is a pre-existing issue and was not restored by this remediation. No official Final timing, marks or essay length is inferred from older exams. Lecturer video links are references; unavailable video arguments are not attributed to their titles.
