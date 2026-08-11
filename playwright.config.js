const path = require("path");

const {
  defineConfig,
} = require("@playwright/test");

require("dotenv").config({
  path: path.resolve(
    process.cwd(),
    ".env.local"
  ),
});

const authFile = path.join(
  process.cwd(),
  "playwright",
  ".auth",
  "admin.json"
);

module.exports = defineConfig({
  testDir: "./tests/e2e",

  fullyParallel: false,

  workers: 1,

  globalSetup:
    require.resolve(
      "./tests/globalSetup"
    ),

  globalTeardown:
    require.resolve(
      "./tests/globalTeardown"
    ),

  use: {
    baseURL:
      "http://127.0.0.1:3000",

    trace: "retain-on-failure",

    screenshot:
      "only-on-failure",
  },

  projects: [
    {
      name: "unauthenticated",

      testMatch:
        /authentication\.spec\.js/,

      use: {
        storageState: {
          cookies: [],
          origins: [],
        },
      },
    },

    {
      name: "authenticated",

      testIgnore:
        /authentication\.spec\.js/,

      use: {
        storageState: authFile,
      },
    },
  ],

  webServer: {
    command: "npm run dev",

    url:
      "http://127.0.0.1:3000",

    reuseExistingServer: true,

    timeout: 120_000,
  },
});