# Vestiges

Jeu web interactif : le carnet des énigmes non résolues de Graham Hancock, entre journal intime et escape game, autour des grandes énigmes des bâtisseurs anciens. Chaque cas oppose les thèses de *Bâtisseurs de l'Ancien Monde* (Pooyard, 2020) et d'*Ancient Apocalypse* (Netflix, 2022) à l'état de la recherche, puis laisse le joueur trancher : légende, expliqué, non prouvé ou vrai mystère.

*An interactive web game: Graham Hancock's notebook of unsolved enigmas, half journal, half escape game. French and English.*

## Version 0.1

- Atlas des sept cas, centré sur le Pacifique
- Cas 1 · **Sacsayhuamán** (Pérou) : observation, mesures, atelier d'ajustage des joints, débat, verdict
- Cas 2 · **Nan Madol** (Pohnpei, Micronésie) : atelier de radeau de basalte avec marée
- Cas à venir : Sirius, le Déluge, Göbekli Tepe, Rapa Nui, les Maya
- Français et anglais, desktop et mobile
- Film d'introduction traité « archive » (bords fondus au noir), à passer ou à revoir depuis l'onglet Film
- Bande originale : *Archival Expedition* sur l'atlas, *Steppe Wind* dans les Andes, *L'Inconnu* pendant les autres enquêtes ; musique et bruitages réglables séparément
- Bruitages générés en direct (WebAudio) ; ambiance générée en secours si la musique ne charge pas

## Branche `doggerland` : vertical slice « Le royaume englouti »

Cas 08, sous la mer du Nord. Une boucle de dix à quinze minutes : l'enveloppe et l'os gravé, la Table des temps (carte marine qui se redessine selon l'époque, relevé à aligner, bande chronologique, emplacement « ce qui date l'horizon H2 »), la carotte VST-1 et ses quatre fiches de datation, puis le paysage retrouvé.

- Tout est dessiné (SVG), aucune photo. La carotte VST-1 et le trait de côte selon l'époque sont des simulations pédagogiques, étiquetées comme telles dans le jeu.
- Sources : Rijksmuseum van Oudheden (os de bison gravé, 2018) ; Walker et al., *Antiquity*, 2020 ; Gaffney et al., *Geosciences*, 2020 ; Université de Bradford, 2025 et 2026 (Allaby et al., *PNAS*). Liste complète dans la page « Sources et méthode » du cas.
- Tests : `?playtest=1` expose `window.__dg` et `vestigesLog()` ; le parcours complet est rejoué par Playwright (`dgloop.js`) en français et en anglais, à 1440 et à 390 px.

## Lancer

Un seul fichier statique, sans build. Ouvrir `index.html`, ou servir le dossier :

```
python3 -m http.server 8000
```

Les polices sont chargées depuis Google Fonts.

## Structure

```
index.html     le jeu (HTML, CSS et JS dans un seul fichier)
img/           photos et gravures du cas Sacsayhuamán
img/nm/        photos du cas Nan Madol
img/graham/    portrait de Graham Hancock (fiche auteur)
video/         film d'introduction (MP4 H.264 + WebM VP9 de secours)
audio/         bande originale (MP3 128 kb/s, normalisés à -20 LUFS)
```

## Musique

*Archival Expedition*, *L'Inconnu* et *Steppe Wind*, générés avec Suno pour Atelier Daruma.

## Film d'introduction

Monté par Atelier Daruma. Certains plans proviennent de documentaires existants : droits à obtenir avant toute diffusion publique.

## Crédits photographiques

Toutes les images viennent de Wikimedia Commons.

**Sacsayhuamán**
- Esoltas, domaine public — [Sacsayhuamán walls](https://commons.wikimedia.org/wiki/File:Sacsayhuam%C3%A1n_walls.jpg)
- Leon Petrosyan, CC BY-SA 3.0 — [Sacsayhuaman Inca](https://commons.wikimedia.org/wiki/File:Sacsayhuaman_Inca.jpg)
- Diego Delso, CC BY-SA 4.0 — [DD 05](https://commons.wikimedia.org/wiki/File:Sacsayhuam%C3%A1n,_Cusco,_Per%C3%BA,_2015-07-31,_DD_05.JPG), [DD 27](https://commons.wikimedia.org/wiki/File:Sacsayhuam%C3%A1n,_Cusco,_Per%C3%BA,_2015-07-31,_DD_27.JPG)
- Laslovarga, CC BY-SA 4.0 — [Sacsayhuaman Fortress](https://commons.wikimedia.org/wiki/File:Sacsayhuaman_Fortress,_Cusco,_Peru_-_Laslovarga_(3).jpg)
- Sharonkuei, CC BY-SA 4.0 — [Inca stone](https://commons.wikimedia.org/wiki/File:Sacsayhuaman-Inca_stone.jpg)
- E. G. Squier, 1877, domaine public — [gravure 1](https://commons.wikimedia.org/wiki/File:Sacsayhuam%C3%A1n_in_1877_by_Ephraim_George_Squier.jpg), [gravure 2](https://commons.wikimedia.org/wiki/File:Sacsayhuam%C3%A1n_2_in_1877_by_Ephraim_George_Squier.jpg)

**Graham Hancock**
- Cpt.Muji, CC BY 3.0 — [Graham-Hancock.jpg](https://commons.wikimedia.org/wiki/File:Graham-Hancock.jpg) (2010)

**Nan Madol**
- NOAA, domaine public — [Nan madol](https://commons.wikimedia.org/wiki/File:Nan_madol.jpg)
- Patrick Nunn, CC BY-SA 4.0 — [1](https://commons.wikimedia.org/wiki/File:Nan_Madol_megalithic_site,_Pohnpei_(Federated_States_of_Micronesia).jpg), [5](https://commons.wikimedia.org/wiki/File:Nan_Madol_megalithic_site,_Pohnpei_(Federated_States_of_Micronesia)_5.jpg), [9](https://commons.wikimedia.org/wiki/File:Nan_Madol_megalithic_site,_Pohnpei_(Federated_States_of_Micronesia)_9.jpg)
- Uhooep, CC BY-SA 4.0 — [ruins 1](https://commons.wikimedia.org/wiki/File:Nan_Madol_ruins_1.jpg), [ruins 10](https://commons.wikimedia.org/wiki/File:Nan_Madol_ruins_10.jpg)
- CT Snow, CC BY 2.0 — [Nan Madol 1](https://commons.wikimedia.org/wiki/File:Nan_Madol_1.jpg)

Les images ont été recadrées, réduites et vieillies (sépia, grain) pour le jeu. Les images sous CC BY-SA restent sous leur licence d'origine.

---

© Atelier Daruma, Paris. Tous droits réservés sur le code et les textes.
