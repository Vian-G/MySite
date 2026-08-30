import { expect, test, type Page } from '@playwright/test';

const projectRoutes = [
  { path: 'moon-miners', title: 'CMU Moon Miners' },
  { path: 'ur10e-welding', title: 'UR10e Cobot Welding' },
  { path: 'moon-ranger', title: 'MoonRanger' },
  { path: 'skyryder', title: 'Skyryder' },
  { path: 'spirit-buggy', title: 'SPIRIT Buggy' },
  { path: 'first-global-uae', title: 'FIRST Global Team UAE 2024' },
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
    });
  }

  test('moves between adjacent projects', async ({ page }) => {
    await visit(page, 'projects/moon-miners');
    await page.getByTestId('nav-next').click();
    await expect(page).toHaveURL(/#\/projects\/ur10e-welding$/);
    await expect(page.getByRole('heading', { level: 1, name: /UR10e Cobot Welding/ })).toBeVisible();

    await page.getByTestId('nav-prev').click();
    await expect(page).toHaveURL(/#\/projects\/moon-miners$/);
    await expect(page.getByRole('heading', { level: 1, name: /CMU Moon Miners/ })).toBeVisible();
  });

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
