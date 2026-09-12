import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 402, height: 874 } });

test.beforeEach(async ({ page }) => {
  await page.goto('/main/index/searchbar');
});

test('clear keeps input focus; cancel clears and ends search', async ({ page }) => {
  const bar = page.locator('ion-searchbar[placeholder="Cancel on focus"]');
  const input = bar.locator('input');
  const clear = bar.locator('.searchbar-clear-button');
  const cancel = bar.locator('.searchbar-cancel-button');
  await input.fill('Example');
  await expect(clear).toBeVisible();
  await expect(cancel).toBeVisible();
  await expect
    .poll(async () => {
      const field = await input.boundingBox();
      const button = await clear.boundingBox();
      return Math.round(button!.x - field!.x - field!.width);
    })
    .toBe(11);
  await clear.click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await expect(clear).toBeHidden();
  await expect(cancel).toBeVisible();
  await input.fill('Another search');
  await cancel.click();
  await expect(input).toHaveValue('');
  await expect(input).not.toBeFocused();
  await expect(cancel).toBeHidden();
});

test('clearIcon works without registering cancel icon support', async ({ page }) => {
  const bar = page.locator('ion-searchbar[placeholder="Clear icon only"]');
  const input = bar.locator('input');
  await input.fill('Clear this');
  const clear = bar.locator('.searchbar-clear-button');
  await expect(clear).toBeVisible();
  await expect(bar.locator('.searchbar-cancel-button')).toHaveCount(0);
  await expect(bar.locator('.ios27-searchbar-cancel-icon')).toHaveCount(0);
  await expect
    .poll(() =>
      bar.evaluate(
        (element: HTMLIonSearchbarElement) =>
          element.querySelector<HTMLIonIconElement>('.searchbar-clear-icon')?.icon === element.clearIcon,
      ),
    )
    .toBe(true);
  await clear.click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await expect(clear).toBeHidden();
});

test('cancel preserves its localized accessible name and Ionic handler', async ({ page }) => {
  const bar = page.locator('ion-searchbar[placeholder="Cancel on focus"]');
  await bar.evaluate((element: HTMLIonSearchbarElement) => {
    element.cancelButtonText = '検索を閉じる';
    element.addEventListener('ionCancel', () => {
      element.dataset['cancelCount'] = String(Number(element.dataset['cancelCount'] || 0) + 1);
    });
  });
  await bar.locator('input').fill('Example');
  const cancel = bar.getByRole('button', { name: '検索を閉じる' });
  await expect(cancel).toBeVisible();
  await cancel.click();
  await expect(bar.locator('input')).toHaveValue('');
  await expect(bar).toHaveAttribute('data-cancel-count', '1');
});

test('does not duplicate an icon rendered by Ionic', async ({ page }) => {
  const bar = page.locator('ion-searchbar[placeholder="Cancel always visible"]');
  await expect(bar.locator('.ios27-searchbar-cancel-icon')).toHaveCount(1);
  await bar.evaluate((element: HTMLIonSearchbarElement) => {
    const icon = document.createElement('ion-icon');
    icon.icon = element.cancelButtonIcon;
    icon.setAttribute('data-native-icon', '');
    element.querySelector('.searchbar-cancel-button > div')!.append(icon);
  });
  await expect(bar.locator('.ios27-searchbar-cancel-icon')).toHaveCount(0);
  await expect(bar.locator('.searchbar-cancel-button ion-icon')).toHaveCount(1);
  await expect(bar.locator('[data-native-icon]')).toHaveCount(1);
});

test('localized text cancel remains stationary without icon support', async ({ page }) => {
  const bar = page.locator('ion-searchbar[placeholder="Clear icon only"]');
  await bar.evaluate((element: HTMLIonSearchbarElement) => {
    element.showCancelButton = 'always';
    element.cancelButtonText = '検索をキャンセル';
  });
  await bar.locator('input').fill('Example');
  const button = bar.locator('.searchbar-cancel-button');
  await button.scrollIntoViewIfNeeded();
  await expect(button).toBeVisible();
  await expect(button).toHaveCSS('margin-right', '0px');
  await button.click({ trial: true });
  const rect = (await button.boundingBox())!;
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  try {
    await expect.poll(() => button.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)).toBe(1);
    await expect(button).toHaveCSS('margin-right', '0px');
    expect((await button.boundingBox())!.x).toBeCloseTo(rect.x, 1);
  } finally {
    await page.mouse.up();
  }
  await expect(bar.locator('input')).toHaveValue('');
  await expect(bar.locator('input')).not.toBeFocused();
  await expect(button).toBeVisible();
});

test('reduced motion and never settings are respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const bar = page.locator('ion-searchbar[placeholder="Cancel on focus"]');
  await bar.locator('input').fill('Example');
  await expect
    .poll(() => bar.locator('.searchbar-clear-button').evaluate((button) => getComputedStyle(button).transitionDuration))
    .toBe('0s');
  await bar.evaluate((element: HTMLIonSearchbarElement) => {
    element.showClearButton = 'never';
    element.showCancelButton = 'never';
  });
  await expect(bar.locator('.searchbar-clear-button')).toBeHidden();
  await expect(bar.locator('.searchbar-cancel-button')).toHaveCount(0);
  await expect(bar.locator('input')).toHaveValue('Example');
});

test('cancel press spring preserves the native curve within the available padding', async ({ page }) => {
  const button = page.locator('ion-searchbar[placeholder="Cancel always visible"] .searchbar-cancel-button');
  await button.scrollIntoViewIfNeeded();
  const rect = (await button.boundingBox())!;
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  try {
    const widths = await button.evaluate((element) => {
      const transition = element.getAnimations().find((animation) => (animation as CSSTransition).transitionProperty === 'transform');
      if (!transition) throw new Error('Missing press transition');
      transition.pause();
      return [66, 116, 166, 233, 433].map((time) => {
        transition.currentTime = time;
        return element.getBoundingClientRect().width;
      });
    });
    for (const [index, nativeWidth] of [53.64, 59.77, 61.29, 60.53, 60].entries()) {
      const fittedWidth = 44 + (nativeWidth - 44) * (13.2 / 16);
      expect(Math.abs(widths[index] - fittedWidth)).toBeLessThan(0.1);
      // Include the scaled 0.5px border on both sides at the overshoot peak.
      expect(widths[index] + widths[index] / 44).toBeLessThan(60);
    }
  } finally {
    await page.mouse.up();
  }
});

for (const [placeholder, selector] of [
  ['Clear icon only', '.searchbar-clear-button'],
  ['Cancel on focus', '.searchbar-cancel-button'],
]) {
  test(`${placeholder} has a centered press effect`, async ({ page }) => {
    const bar = page.locator(`ion-searchbar[placeholder="${placeholder}"]`);
    await bar.locator('input').fill('Press');
    const button = bar.locator(selector);
    await button.scrollIntoViewIfNeeded();
    await expect.poll(() => button.evaluate((el) => el.getBoundingClientRect().width)).toBe(44);
    const rect = (await button.boundingBox())!;
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await page.mouse.down();
    try {
      await expect(button).toBeVisible();
      await expect.poll(() => button.evaluate((el) => Math.round(el.getBoundingClientRect().width * 100) / 100)).toBe(57.2);
      const pressed = (await button.boundingBox())!;
      expect(pressed.x + pressed.width / 2).toBeCloseTo(rect.x + rect.width / 2, 1);
      expect(pressed.y + pressed.height / 2).toBeCloseTo(rect.y + rect.height / 2, 1);
      expect(pressed.height).toBeCloseTo(57.2, 1);
      await expect(button.locator('ion-icon')).toHaveCSS('opacity', '0.55');
    } finally {
      await page.mouse.up();
    }
    await expect(button).toBeHidden();
  });
}
