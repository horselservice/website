const {
  test,
  expect,
} = require(
  "@playwright/test"
);

test(
  "utloggad användare kan inte öppna admin",
  async ({ page }) => {
    await page.goto(
      "/admin/produkter"
    );

    await expect(
      page
    ).toHaveURL(
      /\/admin\/login/,
      {
        timeout: 10_000,
      }
    );
  }
);