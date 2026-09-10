---
title: Adaptive iOS themes
---

# Adaptive iOS themes

Use CSS feature queries to choose a theme while keeping Ionic's default iOS styles on older browsers. Safari 27 adds `:heading` support; see the [WebKit announcement](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/).

These checks detect browser capabilities, not the operating system version. Other browsers may support the same features. Keep Ionic mode and platform-specific animation configuration consistent with your application.

## Load only the iOS 27 theme

In your global Sass stylesheet, use `meta.load-css` inside the feature query. Unlike `@use`, it can emit the theme inside `@supports`.

```scss
@use 'sass:meta';

@supports selector(:heading) {
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/default-variables');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/ionic-theme-ios27');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/ionic-theme-ios27-dark-class');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/md-remove-ios-class-effect');
}
```

## Use the iOS 26 and iOS 27 themes together

Install both packages:

```bash
npm install @rdlabo/ionic-theme-ios26 @rdlabo/ionic-theme-ios27
```

Use this global Sass configuration instead of unconditional theme imports:

```scss
@use 'sass:meta';

@supports selector(:heading) {
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/default-variables');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/ionic-theme-ios27');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/ionic-theme-ios27-dark-class');
  @include meta.load-css('@rdlabo/ionic-theme-ios27/src/styles/md-remove-ios-class-effect');
}

@supports (text-wrap: pretty) and (not selector(:heading)) {
  @include meta.load-css('@rdlabo/ionic-theme-ios26/src/styles/default-variables');
  @include meta.load-css('@rdlabo/ionic-theme-ios26/src/styles/ionic-theme-ios26');
  @include meta.load-css('@rdlabo/ionic-theme-ios26/src/styles/ionic-theme-ios26-dark-class');
  @include meta.load-css('@rdlabo/ionic-theme-ios26/src/styles/md-remove-ios-class-effect');
}
```

The branches are mutually exclusive. Browsers without either feature retain Ionic's default styling. The `text-wrap: pretty` check preserves the earlier theme's capability-based fallback for older Safari versions.

Both examples use class-based dark mode. Load Ionic's matching dark palette in your application; for system or always-dark mode, replace the `-dark-class` imports with the matching variant. If you also use `md-ion-list-inset`, load the corresponding package's stylesheet inside each branch.

## Select matching JavaScript animations

Use the same feature checks for dynamic imports before initializing Ionic. Call this loader for the iOS platform; leave other platforms on their existing animation configuration.

```ts
async function loadIOSAnimations() {
  if (typeof CSS === 'undefined') {
    return {};
  }

  const theme = CSS.supports('selector(:heading)')
    ? await import('@rdlabo/ionic-theme-ios27')
    : CSS.supports('text-wrap: pretty')
      ? await import('@rdlabo/ionic-theme-ios26')
      : undefined;

  if (!theme) {
    return {};
  }

  return {
    navAnimation: theme.iosTransitionAnimation,
    popoverEnter: theme.popoverEnterAnimation,
    popoverLeave: theme.popoverLeaveAnimation,
  };
}

// In your browser bootstrap, before initializing Ionic:
const animations = isPlatform('ios') ? await loadIOSAnimations() : {};
provideIonicAngular({ ...animations });
```

Import `isPlatform` and `provideIonicAngular` from your Ionic Angular entry point as shown in the README. Pass the same options to `setupIonicReact` or `IonicVue` when using those frameworks. The imports are selected at runtime; the bundler may still emit chunks for both packages. In server-rendered apps, run the selection during browser initialization.
