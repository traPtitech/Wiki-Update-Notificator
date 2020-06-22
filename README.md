# Wiki Update Notificator
[![GitHub release](https://img.shields.io/github/release/traPtitech/Wiki-Update-Notificator.svg)](https://GitHub.com/traPtitech/Wiki-Update-Notificator/releases/)
![CI](https://github.com/traPtitech/Wiki-Update-Notificator/workflows/CI/badge.svg)
![release](https://github.com/traPtitech/Wiki-Update-Notificator/workflows/release/badge.svg)

Sends webhook to traQ when wiki page is updated.
Runs on Google Apps Script.

## Props
- `WEBHOOK_SECRET`: traQ Webhook Secret
- `URL_ENCODED_WIKI_API_TOKEN`: URL encoded Crowi API Token
- `lastUpdated`: last checked time (Would be updated and overwritten automaticaly)
