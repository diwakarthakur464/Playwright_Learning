const { expect, test } = require('@playwright/test');

test('Handling Frames', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/nested_frames');
  const frameCount = page.frames().length;
  await expect(frameCount).toBe(6);

  const frame1 = page.frame({ name: 'frame-middle' });
  await expect(frame1.locator('#content')).toHaveText('MIDDLE');
});

test('Handling Frames 2', async ({ page }) => {
  await page.goto('https://demoqa.com/frames');

  const frame1 = page.frameLocator('#frame1');
  await expect(frame1.locator('#sampleHeading')).toHaveText('This is a sample page');

  const frame2 = page.frameLocator('#frame2');
  await expect(frame2.locator('#sampleHeading')).toHaveText('This is a sample page');
});