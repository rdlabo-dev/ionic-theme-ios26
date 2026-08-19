CSS variables, opt-out class, and the liquid glass mixin. See [Using ion-item-group](./using-ion-item-group.md) for list markup.

### CSS Variables

To customize the library's default styles to match your design, several CSS variables are provided. See this file for details:
https://github.com/rdlabo-dev/ionic-theme-ios26/blob/v2.3.2/src/styles/default-variables.scss

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

https://ionic-theme-ios26.netlify.app/main/docs
