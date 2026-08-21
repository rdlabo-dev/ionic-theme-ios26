---
title: Special markup and classes
---

# Special markup and classes

Most Ionic markup works without changes. The combinations below are explicit opt-ins used by the theme and demonstrated in `demo/src/app/docs`.

## Primary submit buttons

Solid primary submit buttons use `--ion-color-primary-brightness` for their foreground and border treatment. Define a value with sufficient contrast for your primary color.

```css
:root {
  --ion-color-primary-brightness: #96feff;
}
```

```html
<ion-button type="submit" color="primary">Submit</ion-button>
```

## Two-line inset list items

Place an unslotted `ion-label` immediately alongside an unslotted `ion-note` to render a two-line item. When using the iOS-style inset-list background, wrap the items in `ion-item-group`; keep `ion-list-header` outside the group.

```html
<ion-list inset="true">
  <ion-list-header>
    <ion-label>Connections</ion-label>
  </ion-list-header>
  <ion-item-group>
    <ion-item>
      <ion-label>Network &amp; internet</ion-label>
      <ion-note>Mobile, Wi-Fi, hotspot</ion-note>
    </ion-item>
  </ion-item-group>
</ion-list>
```

Use `slot="end"` on `ion-note` when you want the standard trailing-note layout instead.

## Full-width segments

Add `.segment-expand` when segment buttons should divide the available width evenly. The class also changes the Liquid Glass effect sizing when `registerSegmentEffect` is used.

```html
<ion-segment class="segment-expand" value="new">
  <ion-segment-button value="new"><ion-label>New</ion-label></ion-segment-button>
  <ion-segment-button value="replied"><ion-label>Replied</ion-label></ion-segment-button>
</ion-segment>
```

## Classic search bar

The default theme uses the iOS 26 search field. Add `.searchbar-classic` to retain the classic Ionic iOS search-bar appearance. Place it inside `ion-toolbar` so the toolbar-specific layout rules apply.

```html
<ion-toolbar>
  <ion-searchbar class="searchbar-classic"></ion-searchbar>
</ion-toolbar>
```

## Opting out

Add `.ios26-disabled` to an individual Ionic component when it must retain Ionic's standard iOS styling.

```html
<ion-button class="ios26-disabled">Standard Ionic button</ion-button>
```

For the background model behind inset lists, see [Using `ion-item-group`](./using-ion-item-group.md).
