const { test, expect } = require("@playwright/test");

const { readTestProduct } = require("../helpers/testData");

test("testprodukten visas i produktlistan", async ({ page }) => {
  const product = readTestProduct();

  await page.goto("/admin/produkter");

  const searchInput = page.getByPlaceholder("Skriv produktnamn...");

  await searchInput.fill(product.name);

  await expect(
    page.getByText(product.name, {
      exact: true,
    }),
  ).toBeVisible();
});

test("admin kan redigera produktinformation", async ({ page }) => {
  const product = readTestProduct();

  await page.goto(`/admin/produkter/${product.id}`);

  const nameInput = page.locator("#product-name");

  const shortDescription = page.locator("#short-description");

  const description = page.locator("#product-description");

  const usageText = page.locator("#usage-text");

  const technicalInformation = page.locator("#technical-information");

  const price = page.locator("#price-ex-vat");

  const rentPrice = page.locator("#rent-price-ex-vat");

  await expect(nameInput).toHaveValue(product.name);

  const updatedName = `${product.name} ändrad`;

  await nameInput.fill(updatedName);

  await shortDescription.fill("Ny kort beskrivning från E2E-test.");

  await description.fill("Ny produktbeskrivning från E2E-test.");

  await usageText.fill("Testmiljöer och automatiska tester.");

  await technicalInformation.fill("Teknisk information från Playwright.");

  await price.fill("1250");

  await rentPrice.fill("125");

  const updateResponse = page.waitForResponse(
    (response) =>
      response.url().includes("/rest/v1/products") &&
      response.request().method() === "PATCH",
  );

  await page
    .getByRole("button", {
      name: "Spara ändringar",
    })
    .click();

  const response = await updateResponse;

  expect(response.ok()).toBeTruthy();

  await page.reload();

  await expect(nameInput).toHaveValue(updatedName);

  await expect(shortDescription).toHaveValue(
    "Ny kort beskrivning från E2E-test.",
  );

  await expect(description).toHaveValue("Ny produktbeskrivning från E2E-test.");

  await expect(usageText).toHaveValue("Testmiljöer och automatiska tester.");

  await expect(technicalInformation).toHaveValue(
    "Teknisk information från Playwright.",
  );

  await expect(price).toHaveValue("1250");

  await expect(rentPrice).toHaveValue("125");
});
