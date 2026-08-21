# Ionic Theme iOS26

A CSS/JS theme library that applies iOS26 design system to Ionic applications.

![iOS 26 themed Ionic screens with Liquid Glass tab bar, lists, and controls](https://raw.githubusercontent.com/rdlabo-dev/ionic-theme-ios26/v2.3.2/screenshots/ios26.png)

DEMO is here: https://ionic-theme-ios26.rdlabo.dev/

## Overview

This library provides CSS/JS files that bring the iOS26 design system to Ionic applications. It updates the look and feel of Ionic components to match the latest iOS26 design guidelines.

I'm also working on the Android Design (Material Design 3) theme. Be sure to catch up!

👉️[rdlabo-dev/ionic-theme-md3](https://github.com/rdlabo-dev/ionic-theme-md3)


## Quick start

After [Installation](#installation), import the theme CSS. Details are in Installation below.

## Installation

This is a CSS theme for extending your Ionic project. It does not work on its own, so use it together with the Ionic Framework.

```bash
npm install @rdlabo/ionic-theme-ios26
```

Note: **If you use @ionic/core@ < 8.8.1**, use @rdlabo/ionic-theme-ios26@2.2.1.

And import the theme in your project's main CSS file (e.g., `src/styles.scss`).

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/default-variables.css';
@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css';

/**
 * This file is to eliminate the impact of class name changes for iOS26.
 * For example, `ion-buttons ion-button[fill=default]` is not normally implemented, but may be required for iOS26.
 * This file is to eliminate such effects.
 * Note: This is not include `@rdlabo/ionic-theme-md3`
 */
@import '@rdlabo/ionic-theme-ios26/dist/css/md-remove-ios-class-effect.css';

/**
 * If you will use the design of ion-item-group with ion-list on Android as well, import it.
 * More info: ./docs/using-ion-item-group.md
 * Note: This is include `@rdlabo/ionic-theme-md3`
 * @import '@rdlabo/ionic-theme-ios26/dist/css/md-ion-list-inset.css';
 */

/*
 * Support Dark Mode
 * We support Ionic Dark Mode. More information is here: https://ionicframework.com/docs/theming/dark-mode
 * use Always:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-always.css'
 * use System:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-system.css'
 * use CSS Class: @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-class.css'
 */
```

Next, configure the animations for iOS 26. Add the following to your Ionic configuration options.

```ts
import { isPlatform } from '@ionic/core'; // or @ionic/angular/standalone, @ionic/react, @ionic/vue
import { iosTransitionAnimation, popoverEnterAnimation, popoverLeaveAnimation } from '@rdlabo/ionic-theme-ios26';

// Angular
provideIonicAngular({
    ...
    navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
    popoverEnter: isPlatform('ios') ? popoverEnterAnimation: undefined,
    popoverLeave: isPlatform('ios') ? popoverLeaveAnimation: undefined,
});

// React
setupIonicReact({
    ...
    navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
    popoverEnter: isPlatform('ios') ? popoverEnterAnimation: undefined,
    popoverLeave: isPlatform('ios') ? popoverLeaveAnimation: undefined,
});

// Vue
createApp(App)
    .use(IonicVue, {
        ...
        navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
        popoverEnter: isPlatform('ios') ? popoverEnterAnimation: undefined,
        popoverLeave: isPlatform('ios') ? popoverLeaveAnimation: undefined,
})
```


## Documentation

Start with [Installation](#installation), then [Using ion-item-group](./docs/using-ion-item-group.md) when you use inset lists.

- [Using ion-item-group](./docs/using-ion-item-group.md) — required markup for inset lists.
- [Features](./docs/features.md) — CSS variables, `.ios26-disabled`, liquid glass.
- [Experimental Animation](./docs/experimental-animation.md) — tab bar and searchable effects.
- [iOS 18](./docs/ios-18.md) — load the theme only on iOS 26.
- [Migration](./docs/migration.md) — selective component imports and dark mode.

<!-- rdlabo-docs-omit -->
**Full documentation:** [https://docs.rdlabo.dev/projects/ionic-theme-ios26](https://docs.rdlabo.dev/projects/ionic-theme-ios26)

## Development & Testing

### Demo Application

The same demo is deployed against both supported Ionic versions:

- [Ionic 9 demo](https://ionic-theme-ios26.rdlabo.dev) — canonical
- [Ionic 8 demo](https://ionic8-theme-ios26.rdlabo.dev) — compatibility

The `demo/` directory contains the Angular application used by both deployments. To run it locally:

```bash
cd demo
npm install
npm start
```

### Visual Regression Testing

We use Playwright for visual regression testing to ensure consistent styling across all components. The test suite automatically captures screenshots of all routes in both light and dark modes.

#### Running Tests

```bash
cd demo

# Run all E2E tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug

# Update baseline screenshots (when intentionally changing UI)
npm run test:e2e:update
```
<!-- /rdlabo-docs-omit -->
