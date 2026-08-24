---
title: Migration
---

# Migration

Review every section newer than the version currently installed, in ascending order. For example, when upgrading from 1.x to 9.0.0, complete the 2.0.0 and 3.0.0 migration steps before reviewing 9.0.0.

Each section lists only the changes that require application code or configuration updates.

## Migrating to 9.0.0

Version 9 aligns the theme's major version with Ionic Framework 9. It does not introduce additional breaking changes beyond those documented in the earlier migration sections.

Both Ionic 8 and Ionic 9 remain supported. Version 9 requires `@ionic/core >=8.8.1 <10`.

## Migrating to 3.0.0

### Rename `.header-item-group` to `.item-group-header`

The class for an `ion-item-group` used as a section header has been renamed for consistency with the element it modifies. Replace every occurrence of `.header-item-group` in application templates and styles.

```diff
- <ion-item-group class="header-item-group">
+ <ion-item-group class="item-group-header">
    ...
  </ion-item-group>
```

The old class is no longer styled by the theme. This rename applies to markup shared with `@rdlabo/ionic-theme-md3` as well.

## Migrating to 2.0.0

### Configure `iosTransitionAnimation`

Version 2 requires the package navigation transition. It follows Ionic's default iOS transition without the obsolete `animateBackButton()` behavior that animated a Large Title into the back-button label.

```ts
import { isPlatform } from '@ionic/core'; // or @ionic/angular/standalone, @ionic/react, @ionic/vue
import { iosTransitionAnimation } from '@rdlabo/ionic-theme-ios26';

// Angular
provideIonicAngular({
  // ...
  navAnimation: isPlatform('ios') ? iosTransitionAnimation : undefined,
});

// React
setupIonicReact({
  // ...
  navAnimation: isPlatform('ios') ? iosTransitionAnimation : undefined,
});

// Vue
createApp(App).use(IonicVue, {
  // ...
  navAnimation: isPlatform('ios') ? iosTransitionAnimation : undefined,
});
```

With this transition configured, `<ion-buttons><ion-back-button></ion-back-button></ion-buttons>` can be used without the unwanted transition side effects caused by the old animation.

## Migrating to 1.0.0

### Update SCSS import paths

The source files moved under `src/styles` when JavaScript files were added to the package.

```diff
- @import '@rdlabo/ionic-theme-ios26/src/default-variables.scss';
+ @import '@rdlabo/ionic-theme-ios26/src/styles/default-variables.scss';
```

Generated CSS paths under `dist` did not change.

### Rename `--ios26-color-background-rgb`

```diff
  :root {
-   --ios26-color-background-rgb: 255, 255, 255;
+   --ios26-content-box-shadow-rgb: 255, 255, 255;
  }
```

### Rename brightness variables

Replace each `--ion-color-*-brightness-rgb` variable with `--ion-color-*-brightness` and use a color value instead of an RGB channel list.

```diff
  :root {
-   --ion-color-primary-brightness-rgb: 130, 255, 255;
+   --ion-color-primary-brightness: #96feff;
  }
```
