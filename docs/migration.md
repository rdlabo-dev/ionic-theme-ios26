---
title: Migration
---

# Migration

## iOS 27 naming

Use `@rdlabo/ionic-theme-ios27` for the current theme. Update stylesheet imports to `ionic-theme-ios27.scss` or `ionic-theme-ios27.css`, including the `-dark-always`, `-dark-system`, and `-dark-class` variants.

The theme now uses the `ios27-` prefix consistently. Update custom CSS variables, selectors, and markup to match, including `ios27-disabled` and `--ios27-*` variables. Legacy names are no longer recognized.

See [Special markup and classes](./special-markup.md) and [Default variables](../src/styles/default-variables.scss) for the current names.

Earlier migration notes are preserved on the [previous theme branch](https://github.com/rdlabo-dev/ionic-theme-ios27/blob/ios26/docs/migration.md).
