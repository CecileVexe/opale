# src

| Folder           | Content                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| `app/`           | Expo Router routes (screens only; they assemble, they do not compute) — step 1.8  |
| `config/`        | `prediction.ts`: every numeric threshold of the calculation guide, and only there |
| `domain/`        | Pure types, local calendar dates, symptom catalogue                               |
| `engine/`        | Pure prediction engine (no React, no database)                                    |
| `data/`          | Encrypted database, migrations, repositories, JSON backup, import adapters        |
| `sync/`          | `CloudProvider` interface, providers, version comparison                          |
| `notifications/` | Local notification planning                                                       |
| `security/`      | Passcode and lock                                                                 |
| `state/`         | App store and selectors                                                           |
| `i18n/`          | i18next setup and FR/EN catalogues                                                |
| `ui/`            | Opaline theme, icons, design system components                                    |

Tests live next to the code (`*.test.ts`); shared test helpers and guide scenarios live in `/test`.
