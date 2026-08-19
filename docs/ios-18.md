### How to prevent loading a theme file on iOS 18

If you want to load a theme file only when the user's device is running iOS 26 (and let users on iOS 18 use the default Ionic iOS theme), you can achieve this by adding a supports-condition to your `import`.

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/default-variables.css' supports(text-wrap: pretty);
@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css' supports(text-wrap: pretty);
@import '@rdlabo/ionic-theme-ios26/dist/css/md-remove-ios-class-effect.css'
  supports(text-wrap: pretty);
@import '@rdlabo/ionic-theme-ios26/dist/css/md-ion-list-inset.css' supports(text-wrap: pretty);
```
