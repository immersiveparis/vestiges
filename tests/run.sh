#!/usr/bin/env bash
# Rejoue les parcours complets dans Chromium, en français et en anglais, à 1440 px et à 390 px.
# Prérequis : npm install (dans tests/), un serveur sur $VESTIGES_URL (par défaut : python3 -m http.server 8765 à la racine du dépôt).
set -u
cd "$(dirname "$0")"
run(){ echo "== $*"; node "$@" 2>&1 | grep -E "errs|^obs|^sec|^cur|Error|^M " ; }
run malte-loop.js fr-FR 1440 900
run malte-loop.js en-US 1440 900
run malte-loop.js en-US 390 844
run malte-save-resume.js fr-FR 1440 900
run malte-final-page.js fr-FR 1440 900
run doggerland-loop.js fr-FR 1440 900
run doggerland-loop.js en-US 390 844
run sacsayhuaman-loop.js fr-FR 1440 900
run sacsayhuaman-loop.js en-US 390 844
run nanmadol-smoke.js
run atlas-smoke.js
