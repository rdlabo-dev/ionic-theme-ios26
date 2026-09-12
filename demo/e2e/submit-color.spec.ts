import { expect, test } from '@playwright/test';

for (const color of [undefined, 'primary', 'danger', 'brand']) {
  test(`submit preserves ${color ?? 'default'} color and contrast when pressed`, async ({ page }) => {
    await page.goto('/main/index/button');
    await page.addStyleTag({ content: '.ion-color-brand { --ion-color-base: #ffee00; --ion-color-contrast: #112233; }' });
    await page.evaluate((color) => {
      const button = document.createElement('ion-button');
      button.id = 'submit-probe';
      button.mode = 'ios';
      button.setAttribute('type', 'submit');
      button.color = color;
      button.textContent = 'Submit';
      button.style.cssText = 'position:fixed;top:100px;left:20px;z-index:99999';
      document.body.append(button);
    }, color);
    const button = page.locator('#submit-probe');
    await expect(button).toHaveClass(/hydrated/);
    const expected = await button.evaluate((element, color) => {
      const style = getComputedStyle(element);
      const background = style.getPropertyValue(color ? '--ion-color-base' : '--ion-color-primary').trim();
      const contrast = style.getPropertyValue(color ? '--ion-color-contrast' : '--ion-color-primary-contrast').trim();
      const probe = document.createElement('span');
      probe.style.color = contrast;
      document.body.append(probe);
      const foreground = getComputedStyle(probe).color;
      probe.remove();
      return { background, foreground };
    }, color);
    const native = button.locator('button');
    await expect(native).toHaveCSS('color', expected.foreground);
    await button.evaluate((element) => element.classList.add('ion-activated'));
    await expect
      .poll(() => button.evaluate((element) => getComputedStyle(element).getPropertyValue('--background-activated').trim()))
      .toBe(expected.background);
    await expect(native).toHaveCSS('color', expected.foreground);
  });
}
