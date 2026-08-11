const {
  createTestProduct,
  cleanupStaleTestProducts,
} = require(
  "./helpers/supabaseTestAdmin"
);

const {
  writeTestProduct,
} = require(
  "./helpers/testData"
);

module.exports =
  async function globalSetup() {
    console.log(
      "Förbereder CMS-testdata..."
    );

    await cleanupStaleTestProducts();

    const product =
      await createTestProduct();

    writeTestProduct(
      product
    );

    console.log(
      `Testprodukt skapad: ${product.name}`
    );
  };