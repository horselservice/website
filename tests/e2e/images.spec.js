const { test, expect } = require("@playwright/test");

const { readTestProduct } = require("../helpers/testData");

const MAX_FILE_SIZE = 500 * 1024;

const MAX_IMAGE_WIDTH = 1000;

const MAX_IMAGE_HEIGHT = 1000;

async function createPngBuffer(
  page,
  { width = 1600, height = 1200, color = "#7c3aed" } = {},
) {
  const base64 = await page.evaluate(
    async ({ width, height, color }) => {
      const canvas = document.createElement("canvas");

      canvas.width = width;

      canvas.height = height;

      const context = canvas.getContext("2d");

      context.fillStyle = color;

      context.fillRect(0, 0, width, height);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const result = reader.result;

          resolve(result.split(",")[1]);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
      });
    },
    {
      width,
      height,
      color,
    },
  );

  return Buffer.from(base64, "base64");
}

function getUploadForm(page) {
  return page.locator("form").filter({
    has: page.getByLabel("Välj bild"),
  });
}

function getImageCard(page, altText) {
  return page.locator("article").filter({
    has: page.getByRole("img", {
      name: altText,
    }),
  });
}

async function uploadImage(page, { name, altText, buffer }) {
  const form = getUploadForm(page);

  await form.getByLabel("Välj bild").setInputFiles({
    name,
    mimeType: "image/png",
    buffer,
  });

  await expect(page.getByText("Förhandsvisning")).toBeVisible();

  await form.getByLabel("Bildbeskrivning").fill(altText);

  await form
    .getByRole("button", {
      name: "Ladda upp bild",
    })
    .click();

  await expect(page.getByText("Bilden har laddats upp.")).toBeVisible({
    timeout: 20_000,
  });

  const card = getImageCard(page, altText);

  await expect(card).toBeVisible({
    timeout: 20_000,
  });

  return card;
}

async function deleteImage(page, card) {
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await card
    .getByRole("button", {
      name: "Ta bort",
    })
    .click();

  await expect(card).toHaveCount(0);
}

test.beforeEach(async ({ page }) => {
  const product = readTestProduct();

  await page.goto(`/admin/produkter/${product.id}`);
});

test("JPEG PNG och WebP är tillåtna men andra filtyper blockeras", async ({
  page,
}) => {
  const input = getUploadForm(page).getByLabel("Välj bild");

  await input.setInputFiles({
    name: "test.txt",

    mimeType: "text/plain",

    buffer: Buffer.from("inte en bild"),
  });

  await expect(
    page.getByText("Bilden måste vara JPEG, PNG eller WebP."),
  ).toBeVisible();
});

test("originalbild över 20 MB blockeras", async ({ page }) => {
  const input = getUploadForm(page).getByLabel("Välj bild");

  const oversizedFile = Buffer.alloc(20 * 1024 * 1024 + 1);

  await input.setInputFiles({
    name: "for-stor.jpg",

    mimeType: "image/jpeg",

    buffer: oversizedFile,
  });

  await expect(
    page.getByText("Originalbilden får vara högst 20 MB."),
  ).toBeVisible();
});

test("uppladdad bild blir WebP max 500 KB och max 1000x1000", async ({
  page,
  request,
}) => {
  const buffer = await createPngBuffer(page, {
    width: 1600,
    height: 1200,
  });

  const altText = "E2E optimerad testbild";

  const card = await uploadImage(page, {
    name: "stor-testbild.png",

    altText,

    buffer,
  });

  const imageUrl = await card.locator("img").getAttribute("src");

  expect(imageUrl).toBeTruthy();

  expect(imageUrl).toMatch(/\.webp(?:\?|$)/);

  const imageResponse = await request.get(imageUrl);

  expect(imageResponse.ok()).toBeTruthy();

  const headers = imageResponse.headers();

  expect(headers["content-type"]).toContain("image/webp");

  const body = await imageResponse.body();

  expect(body.length).toBeLessThanOrEqual(MAX_FILE_SIZE);

  const dimensions = await page.evaluate(
    (src) =>
      new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          resolve({
            width: image.naturalWidth,

            height: image.naturalHeight,
          });
        };

        image.onerror = reject;

        image.src = src;
      }),
    imageUrl,
  );

  expect(dimensions.width).toBeLessThanOrEqual(MAX_IMAGE_WIDTH);

  expect(dimensions.height).toBeLessThanOrEqual(MAX_IMAGE_HEIGHT);

  await deleteImage(page, card);
});

test("huvudbild kan ändras och borttagning väljer nästa bild", async ({
  page,
}) => {
  const firstBuffer = await createPngBuffer(page, {
    color: "#7c3aed",
  });

  const secondBuffer = await createPngBuffer(page, {
    color: "#111111",
  });

  const firstCard = await uploadImage(page, {
    name: "bild-ett.png",

    altText: "E2E bild ett",

    buffer: firstBuffer,
  });

  await expect(firstCard.getByText("Huvudbild")).toBeVisible();

  const secondCard = await uploadImage(page, {
    name: "bild-tva.png",

    altText: "E2E bild två",

    buffer: secondBuffer,
  });

  await secondCard
    .getByRole("button", {
      name: "Gör till huvudbild",
    })
    .click();

  await expect(
    secondCard.getByText("Huvudbild", {
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    firstCard.getByText("Huvudbild", {
      exact: true,
    }),
  ).toHaveCount(0);

  await deleteImage(page, secondCard);

  await expect(
    firstCard.getByText("Huvudbild", {
      exact: true,
    }),
  ).toBeVisible();

  await deleteImage(page, firstCard);
});
