---
title: Features
---

# Features

Customize the theme with CSS variables and Sass mixins, or adopt it one component at a time. Markup-specific opt-ins are documented in [Special markup and classes](./special-markup.md).

## CSS variables

To customize the library's default styles to match your design, several CSS variables are provided. See this file for details:
https://github.com/rdlabo-dev/ionic-theme-ios26/blob/v3.0.0/src/styles/default-variables.scss

## Liquid Glass mixin

Import the SCSS files from the main package to use the liquid glass mixin.

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/api.scss';

ion-textarea label.textarea-wrapper {
  @include api.glass-background;
}
```

## Selective component imports

For gradual adoption, you can import individual components instead of the full theme file.

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/utils/translucent';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-action-sheet';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-alert';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-button';
/* Import the remaining components your application uses. */
```

### Dark mode with individual components

Use SCSS when selectively importing components with dark mode support because the selectors differ between Always, System, and Class modes.

Always:

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

:root {
  @include theme-dark.default-variables;
}
@include theme-dark.ion-button;
@include theme-dark.ion-fab;
@include theme-dark.ion-tabs;
@include theme-dark.ion-segment;
```

System:

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

@media (prefers-color-scheme: dark) {
  :root {
    @include theme-dark.default-variables;
  }
  @include theme-dark.ion-button;
  @include theme-dark.ion-fab;
  @include theme-dark.ion-tabs;
  @include theme-dark.ion-segment;
}
```

Class:

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

.ion-palette-dark {
  @include theme-dark.default-variables;
  @include theme-dark.ion-button;
  @include theme-dark.ion-fab;
  @include theme-dark.ion-tabs;
  @include theme-dark.ion-segment;
}
```

## Interactive examples

[Browse rendered examples in the demo](https://ionic-theme-ios26.rdlabo.dev/main/docs).
