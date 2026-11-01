# Opale

Application mobile de suivi du cycle menstruel pour iOS et Android, en français et en anglais. Elle suit les règles, les symptômes et le cycle, avec des prédictions (règles, fenêtre fertile, ovulation) calculées sur le téléphone.

> **Statut : en développement.** Aucune version publiée.

## Confidentialité

- Les données de santé restent sur le téléphone, dans une base chiffrée.
- Elles ne quittent l'appareil que vers le **Google Drive** ou l'**iCloud** de l'utilisatrice, si elle le choisit.
- Pas de compte, pas de serveur, pas d'analytics, aucun SDK de suivi. La CI refuse tout SDK de ce type dans les dépendances.
- Les prédictions ne sont jamais sauvegardées : elles se recalculent à chaque changement des données.

## Stack

Expo SDK 58 (build de développement), React Native 0.88, TypeScript strict, Expo Router, i18next, `react-native-svg`, Jest. Design system « Opaline » (clair et sombre).

## Démarrer

Prérequis : Node 22, JDK 17 et le SDK Android (pour compiler en local). L'appli utilise des modules natifs : elle ne tourne **pas** dans Expo Go, il faut un build de développement.

```bash
npm install
npx expo run:android --device   # téléphone Android branché, débogage USB activé
```

Les valeurs locales (identifiants Google, plus tard) se mettent dans `.env.local`, jamais dans le dépôt : voir `.env.example`.

## Commandes

| Commande                                  | Rôle                                       |
| ----------------------------------------- | ------------------------------------------ |
| `npm run check`                           | Types, lint, formatage et tests            |
| `npm run typecheck`                       | Vérification TypeScript                    |
| `npm run lint` / `npm run lint:fix`       | ESLint (avec Prettier)                     |
| `npm run format` / `npm run format:check` | Formate, ou vérifie le formatage et les LF |
| `npm test`                                | Tests unitaires                            |
| `npm run test:tz`                         | Tests dans plusieurs fuseaux horaires      |
| `npm run doctor`                          | Diagnostic de la configuration Expo        |

## Qualité

- Un **hook de pré-commit** (husky) lance ESLint sur les fichiers modifiés, la vérification de formatage et `tsc`. Les erreurs bloquent le commit, les avertissements non. Il s'installe avec `npm install` (ou `npm run prepare`).
- La **CI** (GitHub Actions) tourne sur chaque PR vers `develop` ou `main` : types, ESLint, formatage et fins de ligne, dépendances inutilisées, SDK de suivi, CVE critiques, secrets, tests dans plusieurs fuseaux horaires, bundle JavaScript. Les avertissements et les CVE non critiques sont signalés sans bloquer.
- Le **build Android** complet est lancé à la demande (onglet Actions, « Android build »), et automatiquement sur les PR de Dependabot.
- Règles de code appliquées par ESLint : aucun texte en dur dans les écrans, pas de `console`, pas de calcul de jours en multiples de 24 heures, règles d'accessibilité React Native.

## Structure

| Dossier                             | Contenu                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `src/app`                           | Routes Expo Router (écrans minces)                                        |
| `src/config`                        | Seuils chiffrés du calcul des prédictions                                 |
| `src/domain`                        | Types, dates calendaires locales, catalogue des symptômes                 |
| `src/engine`                        | Moteur de prédiction, pur                                                 |
| `src/data`                          | Base chiffrée, migrations, dépôts, sauvegarde et import JSON              |
| `src/sync`                          | Interface `CloudProvider`, Google Drive, iCloud, comparaison des versions |
| `src/notifications`, `src/security` | Rappels locaux, code d'accès                                              |
| `src/i18n`                          | Traductions français et anglais, formats de date et de nombre             |
| `src/ui`                            | Thème Opaline, icônes, composants                                         |

La conception (cahier des charges, règles de calcul, maquettes, design system) est conservée localement et n'est pas versionnée.

## Contribuer

Branches `develop` (par défaut) et `main`, protégées : tout passe par une pull request dont les contrôles sont au vert. Code et commentaires en anglais, textes d'interface en français et en anglais.

## Licence

Tous droits réservés (voir `LICENSE`). Le code est visible pour la transparence, mais ne peut pas être réutilisé sans l'accord écrit de l'autrice.
