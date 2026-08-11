const {
  deleteTestProduct,
  cleanupStaleTestProducts,
} = require(
  "./helpers/supabaseTestAdmin"
);

const {
  readTestProduct,
  removeTestProductFile,
} = require(
  "./helpers/testData"
);

module.exports =
  async function globalTeardown() {
    console.log(
      "Rensar CMS-testdata..."
    );

    try {
      const product =
        readTestProduct();

      await deleteTestProduct(
        product
      );
    } catch (error) {
      console.error(
        "Kunde inte radera " +
          "testprodukten direkt:",
        error
      );

      await cleanupStaleTestProducts();
    } finally {
      removeTestProductFile();
    }
  };