---
title: Features
---

# Features

CSS variables, opt-out class, and the Liquid Glass mixin. See [Using ion-item-group](./using-ion-item-group.md) for list markup.

### CSS Variables

To customize the library's default styles to match your design, several CSS variables are provided. See this file for details:
https://github.com/rdlabo-dev/ionic-theme-ios26/blob/v3.0.0/src/styles/default-variables.scss

### `.ios26-disabled` Class

Add the `.ios26-disabled` class to disable the iOS26 theme on specific components.

```html
<!-- iOS26 theme applied -->
<ion-button>iOS26 Design</ion-button>

<!-- Standard Ionic iOS styling -->
<ion-button class="ios26-disabled">Standard Ionic Design</ion-button>
```

### Liquid Glass Mixin

Import the SCSS files from the main package to use the liquid glass mixin.

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/api.scss';

ion-textarea label.textarea-wrapper {
  @include api.glass-background;
}
```

### Additional Design

To achieve higher fidelity to iOS26 design, you can implement additional design provided by this library. For more details, please visit:

https://ionic-theme-ios26.rdlabo.dev/main/docs

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
