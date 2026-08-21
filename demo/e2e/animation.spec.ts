import { expect, test, type Page } from '@playwright/test';

const installAnimationObserver = async (page: Page) => {
  await page.addInitScript(() => {
    const originalAnimate = Element.prototype.animate;

    (window as any).__IONIC_ANIMATION_CALLS__ = [];
    Element.prototype.animate = function (keyframes, options) {
      const animation = originalAnimate.call(this, keyframes, options);
      const properties = Array.isArray(keyframes)
        ? [
            ...new Set(
              keyframes.flatMap((keyframe) => Object.keys(keyframe).filter((key) => !['offset', 'easing', 'composite'].includes(key))),
            ),
          ]
        : Object.keys(keyframes ?? {}).filter((key) => !['offset', 'easing', 'composite'].includes(key));
      const duration = typeof options === 'number' ? options : typeof options?.duration === 'number' ? options.duration : 0;

      (window as any).__IONIC_ANIMATION_CALLS__.push({
        animation,
        duration,
        properties,
        targetClass: this.getAttribute('class') ?? '',
        targetTag: this.localName,
      });

      return animation;
    };
  });
};

const clearAnimationCalls = async (page: Page) => {
  await page.evaluate(() => ((window as any).__IONIC_ANIMATION_CALLS__ = []));
};

const hasRunningAnimation = (page: Page, targetClass?: string) => {
  return page.evaluate((expectedClass) => {
    return (window as any).__IONIC_ANIMATION_CALLS__.some(
      (call: { animation: Animation; duration: number; properties: string[]; targetClass: string }) =>
        call.animation.playState === 'running' &&
        call.duration > 0 &&
        call.properties.includes('transform') &&
        (expectedClass === undefined || call.targetClass.split(' ').includes(expectedClass)),
    );
  }, targetClass);
};

const hasAnimationCall = (page: Page, targetClass: string) => {
  return page.evaluate((expectedClass) => {
    return (window as any).__IONIC_ANIMATION_CALLS__.some(
      (call: { duration: number; properties: string[]; targetClass: string }) =>
        call.duration > 0 && call.properties.includes('transform') && call.targetClass.split(' ').includes(expectedClass),
    );
  }, targetClass);
};

test.describe('Animation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await installAnimationObserver(page);
  });

  test('runs and completes the iOS page transition', async ({ page }) => {
    await page.goto('/main/index', { waitUntil: 'networkidle' });
    await clearAnimationCalls(page);

    await page.getByRole('button', { name: 'button', exact: true }).click();

    await expect.poll(() => hasRunningAnimation(page), { timeout: 2000 }).toBe(true);
    await expect(page).toHaveURL('/main/index/button');
    await expect(page.locator('app-button.ion-page:not(.ion-page-hidden)')).toBeVisible();
    await expect.poll(() => hasRunningAnimation(page), { timeout: 2000 }).toBe(false);
  });

  test('runs and completes the iOS popover animations', async ({ page }) => {
    await page.goto('/main/index/popover', { waitUntil: 'networkidle' });
    await clearAnimationCalls(page);

    await page.locator('#click-trigger-left').click();

    await expect.poll(() => hasRunningAnimation(page, 'popover-content'), { timeout: 2000 }).toBe(true);
    const popover = page.locator('ion-popover:not(.overlay-hidden)');
    await expect(popover).toBeVisible();
    await expect.poll(() => hasRunningAnimation(page, 'popover-content'), { timeout: 2000 }).toBe(false);

    await clearAnimationCalls(page);
    await page.keyboard.press('Escape');

    await expect.poll(() => hasAnimationCall(page, 'popover-content'), { timeout: 2000 }).toBe(true);
    await expect(popover).toBeHidden();
    await expect.poll(() => hasRunningAnimation(page, 'popover-content'), { timeout: 2000 }).toBe(false);
  });
});
