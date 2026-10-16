# Wiki Update Notificator

[![GitHub release](https://img.shields.io/github/release/traPtitech/Wiki-Update-Notificator.svg)](https://GitHub.com/traPtitech/Wiki-Update-Notificator/releases/)
![CI](https://github.com/traPtitech/Wiki-Update-Notificator/workflows/CI/badge.svg)
![release](https://github.com/traPtitech/Wiki-Update-Notificator/workflows/release/badge.svg)

Sends webhook to traQ when wiki page is updated.
Runs on Google Apps Script.

## Props

- `WEBHOOK_SECRET`: traQ Webhook Secret
- `URL_ENCODED_WIKI_API_TOKEN`: URL encoded Crowi API Token
- `lastUpdated`: last checked time (Would be updated and overwritten automatically)

## Build and deploy

Use Node.js 22 or later. clasp 3 no longer compiles TypeScript, so build before
pushing to Apps Script:

```sh
npm ci
npm run build
npx clasp show-file-status
npx clasp push --force
npx clasp create-deployment --description "<version>"
```

`.clasp.json` points to `dist/`, which contains the compiled JavaScript and
`appsscript.json`. Types are declared in `src/types.d.ts` so the generated script
has no module imports or exports and `wikiUpdateNotificator` remains a global
function for Apps Script triggers. Time-driven triggers use the saved HEAD code;
creating a versioned deployment is not required for them.

clasp is pinned to 3.4.1 in `devDependencies` and the lockfile. CI and local
deployments use this version through `npx clasp`. Run `npm test` to verify the
built script loads without a module loader and exposes the trigger function.
