> **Zweck:** Dieses „Briefing“ kopierst du 1:1 in ein GPT-Modell. Du füllst nur die **Variablen**; es antwortet direkt mit implementierbaren **Patches** (index.html, styles.css, script.js) — segmentiert, immer mit **abgeschlossenem Code-Block** und **ohne** unnötige Erklärungen.

```text
SYSTEM / GLOBAL RULES
- Project: $LARRY website (HTML/CSS/JS, void-gallery + albums).
- Output ONLY code or patch blocks. No commentary.
- Split response into ≤7000 token chunks when needed.
- ALWAYS end the message with a CLOSED code-fence.
- Modify ONLY what is necessary. Respect existing architecture.
- A11y: preserve aria roles/labels, focus logic, prefers-reduced-motion.
- Mobile-first. Do not regress performance (lazy images, IO usage).
- No cross-listing across albums EXCEPT the “Classic Meme (Top/Bottom)” album.
- If a referenced image is missing, keep code robust (fallback placeholder.jpg).

INPUT
- ACTION: <add_albums | update_albums | add_images | update_phrases | remove_items>
- CLASSIC_MEME_SELECTED: [
  "larry-evil-red-bg","larry-dracula-red-bg","larry-dracula-red-bg-2",
  "larry-cute","larry-cute-2","larry-stand","larry-sit-eyecontact",
  "larry-evil-lookin","larry-fullface","larry-mc","larry-fud-bottom","larry"
]
- ALBUMS (no cross-listing except Classic): [
  { id:"classic",  title:"Classic Meme (Top/Bottom)", phrase:"Burn the chart. Bless the caption.", images:[ ...USE CLASSIC_MEME_SELECTED... ] },
  { id:"bloodmoon", title:"Blood Moon / Dracula Arc", phrase:"Nocturnal pumps, eternal fangs.", images:[ "larry-dracula", ... ] },
  { id:"stare",    title:"Judgment Stare", phrase:"He judges; you justify.", images:[ "larry-sit-eyecontact-2","larry-sit-eyecontact-3","larry-sit-eyecontact-4" ] },
  { id:"shadow",   title:"Shadow Realm", phrase:"Follow the wick; meet the abyss.", images:[ "a-larry-dark-silou","a-silou-dark","larry-shadow","mystic","evil-larry-burning","larry-evil-weed","larry-evil_silly-banner" ] },
  { id:"ct-life",  title:"CT Life & Parody", phrase:"The market calls; Larry answers.", images:[ "larry-decaprio","larry-calling","larry-char-dev","larry-cooking","larry-towel","larry-well-dressed","larry-whisper","larry-whuut","larry-door-bell","larry-poster-red-bg","larry-rizz-god","larry-keep-buyin" ] },
  { id:"power",    title:"Weapons, Suits & Flex", phrase:"Dominance is a utility.", images:[ "a-larry-gun" ] }
]
- PHRASES (per image, optional override): [
  { image:"larry-evil-red-bg", top:"Market bleeding?", bottom:"Ritual feeding." },
  { image:"larry-dracula-red-bg", top:"Bulls pray", bottom:"Predators dine." },
  ...
]
- CONSTRAINTS:
  * Keep index.html structure intact (header/hero/chart/lore/wisdom/ticker/footer).
  * Gallery uses albums accordion (details.summary) with .void-item tiles.
  * script.js must define/extend `albumManifest` and `buildAlbums()`; apply no regressions to overlay, copyContract, wisdom, ticker.
  * styles.css keeps Void-Gallery and Album styles consistent with existing tokens and effects.

OUTPUT FORMAT
1) If HTML changes are needed: provide a full replacement block for the relevant section OR a unified diff style patch:
--- index.html (patch)
*** Begin Patch
*** Update File: index.html
@@
<REPLACED/ADDED LINES>
*** End Patch

2) For CSS/JS: same patch format per file (styles.css, script.js). OMIT untouched files.

3) Large outputs: split across multiple messages. Each message MUST end with a closed code fence.

VALIDATION / SELF-CHECK (SILENT)
- No cross-listing violations (except classic). 
- Images referenced exist in INPUT or are handled with placeholder.
- No console errors in init path.
- Mobile grid remains responsive (min tiles @ 120px).
- Overlay and keyboard controls unaffected.

READY PROMPTS (examples)
- “ACTION:add_albums with ALBUMS:=<paste> and PHRASES:=<paste>. Generate patches.”
- “ACTION:update_phrases for classic images only. Generate JS patch only.”
- “ACTION:add_images to album:'ct-life' images:['new1','new2'] with phrases… Generate minimal JS patch.”

END OF MASK
```
