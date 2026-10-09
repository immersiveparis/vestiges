# Tests Vestiges

Parcours automatisés dans un vrai navigateur (Playwright, Chromium), avec de vrais glisser-déposer au pointeur. Chaque parcours joue un chapitre de bout en bout, mesure le débordement des pages (hauteur de contenu / hauteur de page, cible 800/800 sur desktop) et capture les écrans dans `tests/out/`.

```
cd tests && npm install
python3 -m http.server 8765 --directory ..     # dans un autre terminal
bash run.sh
```

| Script | Ce qu'il joue |
| --- | --- |
| `malte-loop.js <locale> <w> <h>` | Malte en entier : chambre (comparaison sur la table lumineuse, miroir), temple (première lumière, axe), horizon (ruban, viseur), atelier (balancement, anneau, trois notes, secret des tours), géomètre (viseur à la poignée, lectures A et B, calque), Quatre Matins (six prises dont des fausses), dossier Sirius, huit secrets. Attendu : 17 observations, 8/8 secrets, `errs []`. |
| `malte-save-resume.js` | Sauvegarde en cours de partie, rechargement, reprise à la page sauvegardée, « Rejouer ». |
| `malte-final-page.js` | Dernière page complétée, mesure du débordement. |
| `doggerland-loop.js` | Enveloppe, Table des temps (relevé, bande, fiche H2), carotte (fiches, inversion), paysage. |
| `sacsayhuaman-loop.js` | Enquête V3 complète. |
| `nanmadol-smoke.js`, `atlas-smoke.js` | Ouverture des pages, pas d'erreur JS. |
| `*-shot.js`, `malte-pages-shots.js` | Captures pour le comparatif (affordances, alignement, pages). |

Variables : `VESTIGES_URL` (défaut `http://localhost:8765`), `VESTIGES_OUT` (défaut `tests/out`), `PW_CHROMIUM` (chemin d'un Chromium), `VESTIGES_FONTS` (dossier de polices locales pour un run hors ligne).

Les scripts utilisent `?playtest=1`, qui expose `window.__dg` (état et moteur) et `vestigesLog()` (télémétrie des événements).
