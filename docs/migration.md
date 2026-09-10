---
title: Migration
---

# Migration

## iOS 27 naming

Use `@rdlabo/ionic-theme-ios27` for the current theme. Update stylesheet imports to `ionic-theme-ios27.scss` or `ionic-theme-ios27.css`, including the `-dark-always`, `-dark-system`, and `-dark-class` variants.

Use the version-independent `--ios-theme-*` CSS variables. The corresponding `--ios26-*` variables remain supported as deprecated fallbacks. When both are set, the new name takes precedence. For example, use `--ios-theme-content-box-shadow-rgb` instead of `--ios26-content-box-shadow-rgb`.

For opting out of the theme, use the version-independent `ios-theme-disabled` class. The `ios26-disabled` class remains supported as a deprecated alias; migrate existing markup when convenient.

See [Special markup and classes](./special-markup.md) and [Default variables](../src/styles/default-variables.scss) for the current names.

Earlier migration notes are preserved on the [previous theme branch](https://github.com/rdlabo-dev/ionic-theme-ios27/blob/ios26/docs/migration.md).
