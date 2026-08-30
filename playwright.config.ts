import { defineConfig, devices } from '@playwright/test';

const previewPort = Number(process.env.PORT) || 4173;
const previewBaseUrl = `http://127.0.0.1:${previewPort}/user/viang/`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: previewBaseUrl,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm serve',
    url: previewBaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
