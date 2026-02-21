# CLAUDE.md — Guide pour assistants IA — mathcoach

Ce fichier est la référence centrale pour tout assistant IA travaillant sur ce dépôt.
Lis-le intégralement avant de toucher au moindre fichier.

---

## Vue d'ensemble du projet

**mathcoach** est un site de cours de mathématiques particuliers en ligne destiné aux lycéens français (Seconde, Première, Terminale). Il propose :

- Du contenu gratuit en accès libre (1 chapitre de démonstration par niveau).
- Un abonnement **MathCoach+** donnant accès à la totalité des cours, exercices corrigés et quiz.

Le modèle économique est **freemium** avec gestion manuelle des abonnements (pas de paiement automatisé). La zone premium est protégée par mot de passe côté JavaScript.

---

## Stack technique

| Composant | Choix |
|---|---|
| Architecture | Site 100 % statique — HTML / CSS / JS pur, aucun framework |
| Rendu des maths | **KaTeX v0.16.9** (chargé via CDN) |
| Polices | **Nunito** (titres, gras) + **DM Sans** (corps de texte) — Google Fonts |
| Hébergement cible | GitHub Pages ou Netlify (gratuit) |
| Back-end | Aucun |
| Build | Aucun — les fichiers sont servis tels quels |
| Dépendances JS | KaTeX uniquement |

**Aucun bundler, aucun transpileur, aucun framework.** Chaque fichier HTML est autonome et s'ouvre directement dans un navigateur.

---

## Charte graphique — Variables CSS à toujours utiliser

Toutes les couleurs sont définies dans `:root` et **doivent être référencées par leur variable**, jamais par leur valeur hexadécimale directe.

```css
:root {
  --navy:      #1a2e4a;  /* Header, footer, éléments forts         */
  --blue:      #2d6a9f;  /* Boutons, accents, liens                */
  --light-bg:  #e8f4fd;  /* Fonds de section alternés              */
  --accent:    #4a9fd4;  /* CTA, highlights                        */
  --white:     #ffffff;  /* Zones de contenu, cartes               */
  --text:      #1a1a2e;  /* Corps de texte principal               */
  --text-muted:#5a6a80;  /* Texte secondaire                       */
}
```

**Polices :**
- Titres / éléments forts → `font-family: 'Nunito', sans-serif;`
- Corps de texte → `font-family: 'DM Sans', sans-serif;`

---

## Structure des fichiers existants

```
mathcoach/
├── index.html                  ← Page d'accueil (vitrine)
├── seconde-fonctions.html      ← Chapitre : Seconde — Fonctions
├── premiere-suites.html        ← Chapitre : Première — Suites numériques
├── CLAUDE.md                   ← ce fichier
└── README.md
```

### `index.html` — Page d'accueil

Sections dans l'ordre :
1. **Navbar fixe** — logo + liens de navigation + bouton MathCoach+
2. **Hero** — accroche avec symboles mathématiques flottants en CSS
3. **Bande de stats** — chiffres clés (élèves, chapitres, etc.)
4. **Section Cours** — 3 colonnes (Seconde / Première / Terminale), 3 cartes de chapitre par niveau
5. **Comparaison accès libre vs MathCoach+** — tableau de fonctionnalités
6. **Comment ça marche** — 3 étapes + encart MathCoach+
7. **CTA final** — appel à l'action abonnement
8. **Footer** — liens, mentions légales, contact

### `seconde-fonctions.html` — Fonctions (Seconde)

**Sujet :** Fonctions — Généralités et représentations.

Structure :
- **Sidebar sticky** avec :
  - Navigation par onglets (Cours / Exercices / Quiz)
  - Barre de progression de lecture
  - Liste des chapitres du niveau (chapitres verrouillés avec cadenas pour non-abonnés)
- **Onglet Cours** — 4 sections :
  1. Notion de fonction
  2. Ensemble de définition
  3. Représentation graphique
  4. Parité
- **Onglet Exercices corrigés** — 3 exercices en accordéon (niveaux : Facile / Intermédiaire / Difficile)
- **Onglet Quiz** — 6 questions à choix multiple avec feedback immédiat + score final

### `premiere-suites.html` — Suites numériques (Première)

**Sujet :** Suites numériques.

Structure identique à `seconde-fonctions.html`, avec :
- **Onglet Cours** — 5 sections :
  1. Définitions et vocabulaire
  2. Suites arithmétiques
  3. Suites géométriques
  4. Comparaison suites arithmétiques vs géométriques
  5. Sens de variation
- **3 graphiques interactifs en Canvas** :
  - Suite arithmétique avec sliders (raison, premier terme)
  - Suite géométrique avec sliders (raison, premier terme)
  - Comparaison arithmétique vs géométrique
- **Onglet Exercices corrigés** — 3 exercices en accordéon
- **Onglet Quiz** — 7 questions

---

## Conventions de code — OBLIGATOIRES

### KaTeX

```html
<!-- Chargement en <head> via CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
```

```js
// Initialisation — toujours dans DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '\\(', right: '\\)',  display: false }, // inline
      { left: '\\[', right: '\\]',  display: true  }, // display
    ],
    throwOnError: false,
  });
});
```

- Formules inline : `\( f(x) = 2x + 1 \)`
- Formules en bloc : `\[ \sum_{k=0}^{n} u_k \]`
- Ne jamais utiliser `$...$` ou `$$...$$` — seuls `\(...\)` et `\[...\]` sont configurés.

### Système de quiz

Structure HTML d'une question :

```html
<div class="question" id="q1">
  <p class="question-text">Énoncé de la question</p>
  <div class="options">
    <div class="option" data-correct="false" data-feedback="Explication de l'erreur.">
      Mauvaise réponse
    </div>
    <div class="option" data-correct="true" data-feedback="Bravo ! Explication de la bonne réponse.">
      Bonne réponse
    </div>
  </div>
</div>
```

- `data-correct="true"` sur la bonne réponse uniquement.
- `data-feedback` contient le texte affiché après le clic (peut contenir du HTML/KaTeX).
- Le score final s'affiche après la dernière question.

### Exercices corrigés en accordéon

```html
<div class="exercise" id="ex1">
  <div class="exercise-header" onclick="toggleCorrection('ex1')">
    <span class="difficulty easy">Facile</span>
    <h3>Titre de l'exercice</h3>
    <span class="toggle-icon">▼</span>
  </div>
  <div class="exercise-content">
    <div class="statement"><!-- Énoncé --></div>
    <div class="correction" id="correction-ex1" style="display:none;">
      <!-- Correction masquée par défaut -->
    </div>
    <button onclick="toggleCorrection('ex1')">Voir la correction</button>
  </div>
</div>
```

```js
function toggleCorrection(id) {
  const el = document.getElementById('correction-' + id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}
```

### Navigation par onglets

```js
function switchTab(name) {
  // Retire la classe active de tous les onglets et panneaux
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  // Active l'onglet et le panneau ciblés
  document.querySelector(`.tab-btn[data-tab="${name}"]`).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}
```

### Graphiques Canvas

- Chaque graphique a une fonction dédiée (ex. `drawArithmeticSuite()`).
- Ces fonctions sont appelées au chargement initial ET au `resize` de la fenêtre.
- Les sliders déclenchent un re-rendu immédiat via `input` event.

```js
function drawArithmeticSuite() {
  const canvas = document.getElementById('canvasArithmetic');
  const ctx = canvas.getContext('2d');
  // ... logique de dessin
}

window.addEventListener('load',   drawArithmeticSuite);
window.addEventListener('resize', drawArithmeticSuite);
document.getElementById('sliderRaison').addEventListener('input', drawArithmeticSuite);
```

### Variables CSS

**Ne jamais écrire une couleur en dur.** Toujours utiliser `var(--nom-variable)`.

```css
/* ✅ Correct */
background-color: var(--navy);
color: var(--text-muted);

/* ❌ Interdit */
background-color: #1a2e4a;
```

---

## Contenu mathématique — Exigences

- Le contenu doit être **rigoureusement conforme au programme officiel de lycée français** (Bulletin Officiel, programmes 2019-2023 pour Seconde, Première, Terminale).
- Utiliser la notation et le vocabulaire du programme français (ex. : "suite arithmétique" et non "progression arithmétique", "ensemble de définition" et non "domaine de définition").
- Exemples numériques : préférer des valeurs entières ou simples pour les démonstrations.
- Les démonstrations doivent être complètes et rédigées, pas seulement le résultat.

**Niveaux et chapitres prévus (non exhaustif) :**

| Niveau | Chapitres |
|---|---|
| Seconde | Fonctions — généralités ✅, Fonctions de référence, Équations/inéquations, Géométrie, Statistiques, Probabilités |
| Première | Suites numériques ✅, Dérivation, Trigonométrie, Fonctions exponentielles, Probabilités conditionnelles |
| Terminale | Limites et continuité, Intégration, Logarithme, Lois continues, Suites et récurrences |

✅ = chapitre existant

---

## Pages restantes à construire

| Page | Description | Priorité |
|---|---|---|
| `seconde/index.html` | Index des chapitres Seconde (liste, statut libre/premium) | Haute |
| `premiere/index.html` | Index des chapitres Première | Haute |
| `terminale/index.html` | Index des chapitres Terminale | Haute |
| `reservation.html` | Réservation de séance (intégration widget Calendly) | Haute |
| `abonnement.html` | Page d'abonnement MathCoach+ + système de mot de passe JS | Haute |
| `a-propos.html` | Page "À propos" du professeur | Moyenne |
| `mentions-legales.html` | Mentions légales + contact | Moyenne |
| Fiches de révision | Pages synthétiques imprimables / téléchargeables PDF | Basse |
| Chapitres supplémentaires | Nouveaux chapitres pour chaque niveau | Continue |

### Système MathCoach+ (protection par mot de passe JS)

- Le mot de passe est stocké en dur (hashé) dans le JS côté client — protection légère, pas cryptographique.
- À la validation du mot de passe, un token est écrit dans `sessionStorage`.
- Les pages premium vérifient ce token au `DOMContentLoaded` et redirigent vers la page d'abonnement si absent.
- Le contenu verrouillé dans la sidebar affiche une icône cadenas et est non-cliquable pour les visiteurs non authentifiés.

---

## Structure recommandée pour un nouveau chapitre

Nommer le fichier : `{niveau}-{slug-du-chapitre}.html`
Ex. : `seconde-fonctions-reference.html`, `terminale-limites.html`

Un chapitre suit systématiquement cette structure :

```
<head>
  ├── Imports Google Fonts (Nunito + DM Sans)
  ├── Lien KaTeX CSS
  ├── <style> avec variables CSS :root + styles de la page
  └── Scripts KaTeX (defer)

<body>
  ├── <nav> — Navbar identique à index.html
  ├── .chapter-layout
  │   ├── <aside> .sidebar (sticky)
  │   │   ├── Barre de progression
  │   │   ├── Onglets (Cours / Exercices / Quiz)
  │   │   └── Liste des chapitres du niveau
  │   └── <main> .chapter-content
  │       ├── #tab-cours (.tab-panel)
  │       ├── #tab-exercices (.tab-panel)
  │       └── #tab-quiz (.tab-panel)
  └── <footer> — Footer identique à index.html
```

---

## Workflow Git

### Convention de nommage des branches

```
claude/<task-slug>-<session-id>
```

### Processus

1. Travailler sur la branche désignée — jamais directement sur `master`.
2. Committer après chaque unité logique de travail.
3. Pousser avec : `git push -u origin <branch-name>`
4. Ouvrir une Pull Request vers `master` quand le travail est terminé.

### Style de message de commit (anglais, impératif)

```
Add premiere-suites chapter with interactive canvas graphs
Fix KaTeX rendering in quiz feedback blocks
Update color variables to match design system
```

---

## Développement local

Aucun serveur ni build requis. Pour éviter les restrictions CORS sur les Canvas et les modules ES :

```bash
# Option 1 — Python (disponible partout)
python3 -m http.server 8080

# Option 2 — Extension VS Code
# "Live Server" de Ritwick Dey
```

Ouvrir ensuite `http://localhost:8080` dans le navigateur.

---

## Règles pour les assistants IA

1. **Lire avant d'écrire** — toujours lire le fichier complet avant de le modifier.
2. **Variables CSS** — ne jamais écrire une couleur hexadécimale directement dans le CSS.
3. **KaTeX** — utiliser exclusivement `\(...\)` et `\[...\]` comme délimiteurs.
4. **Cohérence visuelle** — copier fidèlement la navbar et le footer depuis `index.html` dans chaque nouvelle page.
5. **Programme officiel** — vérifier que tout contenu mathématique est conforme au BO français.
6. **Pas de framework** — ne jamais introduire React, Vue, Alpine.js, Tailwind ou tout autre dépendance externe sauf KaTeX.
7. **Fichiers autonomes** — chaque fichier HTML doit fonctionner sans serveur intermédiaire (sauf contraintes CORS des Canvas).
8. **Mettre à jour ce fichier** — quand un nouveau chapitre ou une nouvelle page est créé(e), l'ajouter aux tableaux de ce CLAUDE.md.

---

_Dernière mise à jour : 2026-02-21._
