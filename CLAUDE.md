# Opale

Application mobile de suivi du cycle menstruel (iOS et Android, français et anglais), en React Native avec Expo SDK 58 et TypeScript strict.

@AGENTS.md

## Principes non négociables

1. **Confidentialité d'abord.** Aucune donnée de santé ne quitte le téléphone, sauf vers le Google Drive ou l'iCloud de l'utilisatrice, choisi par elle. Pas de serveur, pas d'analytics, pas de SDK de suivi, aucun journal contenant des données de santé (`console` est interdit par ESLint).
2. **Les prédictions ne sont jamais sauvegardées.** Cycles et prédictions sont dérivés et recalculés à chaque changement des données.
3. **Les jours sont des jours calendaires locaux** (`'AAAA-MM-JJ'`), jamais des multiples de 24 heures : changements d'heure. L'arithmétique en 24 h est interdite par ESLint.
4. **Tous les seuils chiffrés** du guide de calcul vivent dans `src/config/prediction.ts`, et nulle part ailleurs.
5. **Aucun texte en dur dans les écrans** : tout passe par i18n (`t()`), en français et en anglais. Les catalogues `fr.json` et `en.json` ont les mêmes clés (testé).
6. **Design system Opaline et maquettes à la lettre.** Ni couleur, ni composant, ni écran inventés : s'il manque quelque chose, on pose la question.
7. **Hors périmètre, ne rien construire** : articles, vidéos, cours, assistant IA, communauté, abonnement ou paywall, grossesse, périménopause, Symptom Checker, partage avec un partenaire, mode adolescente, intégrations Apple Santé ou montres.
8. **Aucun secret dans le dépôt**, jamais : pas de clé, de jeton ni de fichier d'identifiants. Les valeurs locales vont dans `.env.local` (modèle : `.env.example`). Le dépôt est public.

## Architecture

- `src/domain`, `src/engine`, `src/config` : logique pure, sans React ni base de données ni Expo.
- `src/data`, `src/sync`, `src/notifications`, `src/security` : accès au monde extérieur (le réseau n'est autorisé que dans `src/sync`).
- `src/ui` : thème Opaline, icônes, composants. `src/app` : routes Expo Router, écrans minces qui assemblent sans calculer.
- Les tokens (`src/ui/theme/tokens.ts`) et les icônes (`src/ui/icons/icons.ts`) sont copiés du design system : ne pas les modifier à la main.
- Les composants lisent couleurs, rayons et espacements dans les tokens, jamais en valeur brute.

## Conventions

- Code, noms et commentaires en anglais. Textes d'interface en français et en anglais. Réponses à l'utilisatrice en français.
- Très peu de commentaires : seulement pour une fonction compliquée ou un utilitaire complexe, ou un « pourquoi » qui n'est pas évident.
- Fins de ligne LF imposées (`.gitattributes`, Prettier). Formatage : `npm run format`.
- Utiliser `npx expo install <paquet>` pour ajouter une dépendance, jamais `npm install` seul.
- Les tests unitaires couvrent toute la logique ; pas de tests d'écrans pour l'instant.

## Composants React

Un composant par fichier, écrit comme une `const` fléchée (jamais une `function`), avec les props déclarées en `interface` et un `export default` à la fin. ESLint l'impose (`react/function-component-definition`, `@typescript-eslint/consistent-type-definitions`). Ordre du fichier :

1. imports ;
2. interfaces des props ;
3. constantes globales, s'il y en a (`StyleSheet.create`, valeurs fixes) ;
4. le composant : `const Nom = (props: NomProps) => {`, puis la déstructuration `const { … } = props;`, puis la logique (hooks, calculs), puis un seul `return` de JSX ;
5. `export default Nom;`.

```tsx
import { View } from 'react-native';

import Text from '../Text';

export interface BadgeProps {
  value: string;
}

const styles = StyleSheet.create({ badge: { padding: 4 } });

const Badge = (props: BadgeProps) => {
  const { value } = props;

  const { colors } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: colors.accent }]}>
      <Text>{value}</Text>
    </View>
  );
};

export default Badge;
```

- Un dossier par composant (`Badge/Badge.tsx`, `Badge/index.ts`) ; `index.ts` ré-exporte le défaut : `export { default, type BadgeProps } from './Badge';`. On importe `import Badge from '../Badge';`.
- Les sous-composants vont dans leur propre fichier. Les hooks et les fonctions utilitaires restent dans des fichiers `.ts`, sans règle particulière.
- Un composant qui a deux rendus possibles (par exemple page et modale) délègue à deux composants et choisit avec un ternaire dans son seul `return`, au lieu de plusieurs `return`.

## Vérifications

```bash
npm run check      # types, lint, formatage, tests
npm run test:tz    # tests dans plusieurs fuseaux horaires
```

- **Ne pas lancer de tests, de lint ni de typecheck à chaque ajout ou modification** : le hook de pré-commit et la CI préviennent s'il y a un souci. On ne lance une vérification que pour diagnostiquer une panne ou si l'utilisatrice la demande.
- Le hook de pré-commit (husky) bloque le commit tant que ceci ne passe pas : ESLint sur les fichiers modifiés, vérification de formatage, `tsc` et **les tests unitaires liés aux fichiers du commit** (`jest --findRelatedTests`, sélection dans `scripts/select-tests.cjs`). La suite complète tourne si un fichier qu'aucun test n'importe change (`package.json`, `jest.config.js`, `eslint.config.js`…) ; la CI la relance toujours. Les erreurs bloquent, les avertissements non.
- La CI (`.github/workflows/pr-checks.yml`) bloque la fusion sur : types, ESLint, formatage, dépendances inutilisées, SDK de suivi, CVE élevée ou critique, secrets, tests (dont multi-fuseaux), bundle JS. Les avertissements et les CVE modérées ou faibles sont signalés sans bloquer.
- Le build Android (`android-build.yml`) est manuel, sauf sur les PR de Dependabot.

## Façon de travailler

- **Ne jamais commiter, pousser, ouvrir de PR ni fusionner** : l'utilisatrice s'en charge. Lecture seule autorisée (`git status`, `git diff`, `git log`).
- Le travail est découpé en phases puis en étapes courtes (plan détaillé local dans `docs/PLAN.md`). À la fin d'une étape : s'arrêter, résumer (fichiers créés ou modifiés, comment vérifier, ce qui est laissé de côté, ce qui est supposé), proposer un message de commit, puis attendre la confirmation avant la suivante.
- Les documents de référence sont locaux et non versionnés dans `docs/` : `cahier-des-charges.md`, `regles-de-calcul.md` (référence unique pour la logique de prédiction, section 9 prioritaire), `design-system/`, `maquettes/`. En cas de contradiction ou de manque, le dire à l'utilisatrice au lieu de combler le vide.
- Branches : `develop` (par défaut) et `main`, protégées ; tout passe par une PR avec les contrôles de la CI au vert.
