import { expect, test, type Page } from '@playwright/test';

const projectRoutes = [
  { path: 'moon-miners', title: 'CMU Moon Miners' },
  { path: 'emit-lab', title: 'EMIT Lab' },
  { path: 'moon-ranger', title: 'MoonRanger' },
  { path: 'skyryder', title: 'Skyryder' },
  { path: 'spirit-buggy', title: 'SPIRIT Buggy' },
  { path: 'first-global-uae', title: 'FIRST Global Team UAE 2024' },
  { path: 'halcon', title: 'HALCON — Aerodynamics Internship' },
] as const;

async function visit(page: Page, path: string) {
  await page.goto(`./#/${path}`);
}

test.describe('portfolio smoke tests', () => {
  test('renders the primary pages', async ({ page }) => {
    await visit(page, '');
    await expect(page.getByRole('heading', { name: /Vian Garg/ })).toBeVisible();

    await visit(page, 'projects');
    await expect(page.getByRole('heading', { name: 'Engineering work' })).toBeVisible();

    await visit(page, 'about');
    await expect(page.getByRole('heading', { name: 'Vian Garg' })).toBeVisible();

    await visit(page, 'academics');
    await expect(page.getByRole('heading', { name: /Academic/ })).toBeVisible();

    await visit(page, 'resume');
    await expect(page.getByRole('heading', { name: /sum/ })).toBeVisible();
  });

  for (const project of projectRoutes) {
    test(`renders project: ${project.path}`, async ({ page }) => {
      await visit(page, `projects/${project.path}`);
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(project.title) })).toBeVisible();
      await expect(page.getByText('Overview', { exact: true })).toBeVisible();
      await expect(page.getByRole('tab')).toHaveCount(7);
      await expect(page.getByRole('tab', { selected: true })).toHaveCount(1);
    });
  }

  test('moves between adjacent projects', async ({ page }) => {
    await visit(page, 'projects/moon-miners');
    for (let step = 1; step <= projectRoutes.length; step++) {
      const project = projectRoutes[step % projectRoutes.length];
      await page.getByTestId('nav-next').click();
      await expect(page).toHaveURL(new RegExp(`#/projects/${project.path}$`));
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(project.title) })).toBeVisible();
    }
    for (let step = projectRoutes.length - 1; step >= 0; step--) {
      const project = projectRoutes[step];
      await page.getByTestId('nav-prev').click();
      await expect(page).toHaveURL(new RegExp(`#/projects/${project.path}$`));
      await expect(page.getByRole('heading', { level: 1, name: new RegExp(project.title) })).toBeVisible();
    }
  });

  test('HALCON solves live flow, resets pitch, pauses, and respects reduced motion', async ({ page }, testInfo) => {
    await visit(page, 'projects/halcon');
    const demo = page.getByTestId('airfoil-flow');
    const canvas = demo.locator('canvas');
    await canvas.scrollIntoViewIfNeeded();
    const steps = async () => Number(await canvas.getAttribute('data-steps'));
    await expect.poll(steps).toBeGreaterThan(120);
    await demo.getByRole('button', { name: 'Pause flow' }).click();
    const pausedSteps = await steps();
    const pixels = await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL());
    await page.evaluate(() => new Promise<void>((resolve) => { let frames = 0; const tick = () => ++frames === 8 ? resolve() : requestAnimationFrame(tick); requestAnimationFrame(tick); }));
    expect(await steps()).toBe(pausedSteps);
    await demo.getByLabel('Airfoil angle').press('End');
    await expect(demo.locator('output').first()).toHaveText('15°');
    await expect.poll(steps).toBe(0);
    expect(await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL())).not.toBe(pixels);
    await demo.getByRole('button', { name: 'Run flow' }).click();
    await expect.poll(steps).toBeGreaterThan(120);
    await expect(demo.getByRole('alert')).toHaveCount(0);
    await demo.getByRole('button', { name: 'Pause flow' }).click();
    await demo.screenshot({ path: testInfo.outputPath('live-cfd.png'), style: 'header { visibility: hidden; }' });
    await demo.getByRole('button', { name: 'Reset flow' }).click();
    await expect.poll(steps).toBe(0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await canvas.scrollIntoViewIfNeeded();
    await expect(demo.getByRole('button', { name: 'Run flow' })).toBeVisible();
    const reducedSteps = await steps();
    await page.evaluate(() => new Promise<void>((resolve) => { let frames = 0; const tick = () => ++frames === 8 ? resolve() : requestAnimationFrame(tick); requestAnimationFrame(tick); }));
    expect(await steps()).toBe(reducedSteps);
    await demo.getByRole('button', { name: 'Run flow' }).click();
    await expect.poll(steps).toBeGreaterThan(reducedSteps);
  });

  test('shows seven archive entries and keeps animated illustrations separate from diagrams', async ({ page }, testInfo) => {
    await visit(page, 'projects');
    await expect(page.getByText('PROJECT ARCHIVE / 07 ENTRIES')).toBeVisible();
    await expect(page.locator('[id^="project-"]')).toHaveCount(7);
    await expect(page.locator('aside svg')).toHaveCount(7);
    await expect(page.locator('aside img')).toHaveCount(0);
    await visit(page, '');
    const featured = page.locator('section').filter({ has: page.getByRole('heading', { name: '02_FEATURED_PROJECTS' }) });
    await expect(featured.getByRole('heading', { level: 3 })).toHaveText([
      'CMU Moon Miners — NASA Lunabotics', 'EMIT Lab — Robotic Welding', 'SPIRIT Buggy — CMU Buggy',
    ]);
    await expect(featured.locator('svg animateTransform').first()).toBeAttached();
    await expect(featured.locator('img')).toHaveCount(3);
    await expect(featured.locator('img').first()).toHaveCSS('opacity', '0');
    await featured.screenshot({ path: testInfo.outputPath('featured-animations.png'), animations: 'disabled', style: 'header { visibility: hidden; }' });
  });

  test('groups both welding systems under EMIT and heating under SPIRIT', async ({ page }) => {
    await visit(page, 'projects/emit-lab');
    await expect(page.getByRole('heading', { name: 'UR10e / Human-motion recreation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Yaskawa / Welding experiment software' })).toBeVisible();
    await expect(page.getByRole('img', { name: /Animated schematic of a six-axis/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /Software architecture diagram/ })).toBeVisible();
    await visit(page, 'projects/spirit-buggy');
    await expect(page.getByRole('heading', { name: /SRS \/ Heating-box/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /Animated schematic of a CMU Sweepstakes/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /Heating-box architecture diagram/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /SRS heating dashboard showing Zone 0/ })).toBeVisible();
  });

  for (const [oldPath, destination] of [
    ['ur10e-welding', 'emit-lab'], ['yaskawa-welding', 'emit-lab'], ['srs-heating-control', 'spirit-buggy'],
  ]) {
    test(`preserves old link: ${oldPath}`, async ({ page }) => {
      await visit(page, `projects/${oldPath}`);
      await expect(page).toHaveURL(new RegExp(`#/projects/${destination}$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }

  for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 1000 }]) {
    test(`updated content fits ${viewport.width}px and loads its images`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      for (const path of ['', 'about', 'projects', 'projects/moon-miners', 'projects/emit-lab', 'projects/spirit-buggy', 'projects/skyryder', 'projects/halcon']) {
        await visit(page, path);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        for (const image of await page.locator('img:visible').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.evaluate(() => window.scrollTo(0, 0));
        if (path === 'projects/moon-miners') {
          await page.getByRole('region', { name: 'Field testing, pit work & competition' }).screenshot({ path: testInfo.outputPath('lunabotics-gallery.png'), style: 'header { visibility: hidden; }' });
        }
        if (path === 'projects/skyryder' || path === 'projects/spirit-buggy' || path === 'projects/emit-lab') {
          await page.locator('svg[role="img"]').evaluateAll((elements) => elements.forEach((element) => {
            const svg = element as SVGSVGElement;
            svg.pauseAnimations(); svg.setCurrentTime(6);
          }));
          await page.getByRole('img', { name: /Animated schematic of a (plane|CMU Sweepstakes buggy|six-axis robotic arm)/ }).screenshot({ path: testInfo.outputPath(`${path.replaceAll('/', '-')}-effects.png`), animations: 'disabled' });
        }
        await page.screenshot({ path: testInfo.outputPath(`${path.replaceAll('/', '-') || 'home'}.png`), fullPage: true, animations: 'disabled' });
        if (!path) await page.screenshot({ path: testInfo.outputPath('home-viewport.png'), animations: 'disabled' });
      }
    });
  }

  test('safely falls back from an unknown route', async ({ page }) => {
    await visit(page, 'does-not-exist');
    await expect(page).toHaveURL(/\/user\/viang\/$/);
    await expect(page.getByRole('heading', { name: /Vian Garg/ })).toBeVisible();
  });

  test('shows the resume verification dialog before a download', async ({ page }) => {
    await visit(page, 'resume');
    await page.getByRole('button', { name: /Download PDF/ }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Quick human check' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Press.*hold to verify/i })).toBeVisible();
  });
});
