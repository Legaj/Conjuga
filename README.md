# Conjuga — Spanish & Swedish study site

A free, open-source Spanish verb and vocabulary trainer, with Swedish study content, responsive lessons, progress tracking, and optional Firebase accounts.

Built as a static website. **No build process is needed to publish it.**

## Training improvements

- **Calmer training room:** larger person, tense, and verb-type labels; a large infinitive; **Swedish meaning always shown immediately below the Spanish verb** in subdued text; no distracting numeric badges beside answer buttons.
- **Deliberate Enter behavior:** the first Enter checks a typed answer. Correct and incorrect feedback stays visible. Enter/Next can advance only after 1.85 seconds, preventing accidental double presses or sudden advancement after a mistake. Nothing advances automatically after a wrong answer.
- **Balanced mixed verbs:** regular present tense mixes -ar, -er, and -ir equally across the session, including even distribution across selected persons. When endings are shared, such as pretérito and imperfecto (-er/-ir), questions are balanced across distinct conjugation-pattern families. Within those quotas, due, under-practiced, and weak forms receive greater selection weight.
- **All combinations / complete coverage:** choose a number of rounds and train one example of every selected pattern × person per round. E.g. **presens + regular + all persons + three rounds = 3 × 6 × 3 = 54 questions**. Pretérito uses -ar vs. -er/-ir patterns: 2 × 6 × 3 = 36. Futurum has shared endings: 1 × 6 × 3 = 18. This mode does **not** append surprise extra questions: missed forms can be repeated from the results page.
- Less visual clutter on lesson pages, while keeping explanations, examples, search, full conjugation tables, and navigation intact.

## More features

- Spanish: 104 verb entries and seven conjugation tenses, regular and irregular/stem-changing/reflexive forms, 1,020 vocabulary entries.
- Swedish: 1,107 vocabulary entries; ORD-style testing and word roots.
- Choice, typing, pronunciation/listening, flashcards, and verb practice; spacing/review queues, profile stats, cloud sync or browser-only guest mode, import/export, bookmarks and mobile layouts.
- 2,127 optional concept illustrations bundled as **12 SVG sprites** in `assets/illustrations-*.svg`. Original generation source is in `create_illustrations.py` and `build_sprites.py`.

## GitHub Pages

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Set branch **`main`**, folder **`/ (root)`**, then **Save**.
4. After GitHub completes deployment, visit [https://legaj.github.io/Conjuga/](https://legaj.github.io/Conjuga/).

This repository has relative asset paths, so it works from the `/Conjuga/` project subdirectory. If Pages is not yet enabled, the URL will not be live.

## Google login + Firebase

`firebase-config.js` contains the **public web app configuration** recovered from the earlier Conjuga deployment for Firebase project `conjuga-artur`. It is safe for the public repository, but it is not proof that OAuth and Firestore permissions have been enabled for the new host.

1. In [Firebase Console](https://console.firebase.google.com/) open **`conjuga-artur`**.
2. Open **Authentication → Settings → Authorized domains**, and add **`legaj.github.io`**. Without this, Google pop-up sign-in can fail with `auth/unauthorized-domain`.
3. Under **Authentication → Sign-in method** enable **Google** (and **Anonymous** if you want a cloud-backed guest account).
4. Ensure the Firestore database named **`conjuga`** exists, and deploy `firestore.rules` to that database. The rules only allow a signed-in user to read/write `users/{their uid}/data/{doc}`.
5. Use **Profile → Logga in med Google** on the website. The website works in local guest mode even if you haven't configured Firebase yet.

Never add service-account keys, admin credentials, or OAuth client secrets to this repository. Google sign-in and cloud synchronization require a browser test after the authorized domain and Firestore rules are configured.

## Local development

```bash
python -m http.server 5173
# http://localhost:5173/
```

Run the tests:

```bash
node tests/core.test.mjs
python tests/visual_smoke_v41.py
python tests/extended_flows_v41.py
python tests/balanced_training.py
```

The browser tests use Python Playwright with Chromium; core tests require Node.js. The generated SVG sprites can be rebuilt from generated illustrations with `python build_sprites.py`.

## File organization

`index.html`, `app.js`, `style.css` — main app; `data/` — lessons and vocabulary; `src/` — conjugation, reviewing and Firebase; `assets/` — favicon and illustrated sprite sheets; `tests/` — test suite; `firestore.rules` — user-scoped cloud data access. This is the GitHub Pages source, not a ChatGPT Sites dependency.

## Notes

Educational definitions, priority scores, and conjugation rules may have inaccuracies. Cloud synchronization has not been verified in a signed-in production browser until Firebase authorization is completed.
