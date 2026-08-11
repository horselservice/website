const fs = require("fs");
const path = require("path");

const testDataDirectory =
  path.join(
    process.cwd(),
    "playwright",
    ".test-data"
  );

const testProductPath =
  path.join(
    testDataDirectory,
    "product.json"
  );

function writeTestProduct(product) {
  fs.mkdirSync(
    testDataDirectory,
    {
      recursive: true,
    }
  );

  fs.writeFileSync(
    testProductPath,
    JSON.stringify(
      product,
      null,
      2
    ),
    "utf8"
  );
}

function readTestProduct() {
  if (
    !fs.existsSync(
      testProductPath
    )
  ) {
    throw new Error(
      "Testprodukten finns inte."
    );
  }

  return JSON.parse(
    fs.readFileSync(
      testProductPath,
      "utf8"
    )
  );
}

function removeTestProductFile() {
  if (
    fs.existsSync(
      testProductPath
    )
  ) {
    fs.unlinkSync(
      testProductPath
    );
  }
}

module.exports = {
  writeTestProduct,
  readTestProduct,
  removeTestProductFile,
};