const pool = require("./pool");

// utils
const setSortCondition = require("../utils/setSortCondition");
const setSortConditionBuilds = require("../utils/setSortConditionBuilds");

// Product Queries
async function getAllProducts() {
  const { rows } = await pool.query(
    "SELECT SETSEED(1), * FROM products ORDER BY RANDOM()"
  );

  return rows;
}

async function getProductsInCategory(category) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category=$1",
    [category]
  );

  return rows;
}

async function getProductsWithIds(productIds) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE id = ANY($1)",
    [productIds]
  );

  return rows;
}

async function addProduct(newProduct) {
  await pool.query(
    "INSERT INTO products (name, category, price, brand, quantity, image, image_type, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      newProduct.name,
      newProduct.category,
      newProduct.price,
      newProduct.brand,
      newProduct.quantity,
      newProduct.image,
      newProduct.imageType,
      JSON.stringify(newProduct.details),
    ]
  );
}

async function updateProduct(updatedProduct) {
  updatedProduct.image !== null
    ? await pool.query(
        "UPDATE products SET name = $1, price = $2, brand = $3, quantity = $4, image = $5, image_type = $6, details = $7 WHERE id = $8",
        [
          updatedProduct.name,
          updatedProduct.price,
          updatedProduct.brand,
          updatedProduct.quantity,
          updatedProduct.image,
          updatedProduct.imageType,
          JSON.stringify(updatedProduct.details),
          updatedProduct.id,
        ]
      )
    : await pool.query(
        "UPDATE products SET name = $1, price = $2, brand = $3, quantity = $4, details = $5 WHERE id = $6",
        [
          updatedProduct.name,
          updatedProduct.price,
          updatedProduct.brand,
          updatedProduct.quantity,
          JSON.stringify(updatedProduct.details),
          updatedProduct.id,
        ]
      );
}

async function getProduct(productId) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [
    productId,
  ]);

  return rows[0];
}

async function deleteProduct(productId) {
  await pool.query("DELETE FROM products WHERE id = $1", [productId]);
}

async function searchProducts(searchKey) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'",
    [searchKey]
  );

  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");

  return rows;
}

async function filterProducts(sort, category) {
  if (sort && !category) {
    const sortQuery = "SELECT * FROM products " + setSortCondition(sort);
    const { rows } = await pool.query(sortQuery);
    return rows;
  } else if (!sort && category) {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE category = ANY($1)",
      [category]
    );
    return rows;
  } else {
    const sortQuery = setSortCondition(sort);
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE category = ANY($1) " + sortQuery,
      [category]
    );
    return rows;
  }
}

async function filterProductsBuild(category) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category = ANY($1) AND quantity >= 1",
    [category]
  );
  return rows;
}

async function reduceProductsQuantity(productIds) {
  await pool.query(
    "UPDATE products SET quantity = quantity - 1 WHERE id = ANY($1::int[])",
    [productIds]
  );
}

async function resetProductQuantity(productId) {
  await pool.query(
    "UPDATE products SET quantity = quantity + 1 WHERE id = $1",
    [productId]
  );
}

async function getProductsNum() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM products");

  return rows[0].count;
}

async function getProductsQuantity() {
  const { rows } = await pool.query("SELECT SUM(quantity) FROM products");

  return rows[0].sum;
}

// Build Queries
async function addBuild(newBuild) {
  await pool.query(
    "INSERT INTO builds (build_for, build_name, price, image, image_type, parts) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      newBuild.buildFor,
      newBuild.buildName,
      newBuild.price,
      newBuild.image,
      newBuild.imageType,
      JSON.stringify(newBuild.parts),
    ]
  );
}

async function updateBuild(updatedBuild) {
  if (updatedBuild.image !== null) {
    await pool.query(
      "UPDATE builds SET build_for = $1, build_name = $2, price = $3, image = $4, image_type = $5, parts = $6 WHERE id = $7",
      [
        updatedBuild.buildFor,
        updatedBuild.buildName,
        updatedBuild.price,
        updatedBuild.image,
        updatedBuild.imageType,
        JSON.stringify(updatedBuild.parts),
        updatedBuild.buildId,
      ]
    );
  } else {
    await pool.query(
      "UPDATE builds SET build_for = $1, build_name = $2, price = $3, parts = $4 WHERE id = $5",
      [
        updatedBuild.buildFor,
        updatedBuild.buildName,
        updatedBuild.price,
        JSON.stringify(updatedBuild.parts),
        updatedBuild.buildId,
      ]
    );
  }
}

async function getBuildPrice(partIds) {
  const { rows } = await pool.query(
    "SELECT SUM(price) FROM products WHERE id = ANY($1)",
    [partIds]
  );

  return rows[0].sum;
}

async function filterbuilds(sort) {
  const sortQuery = "SELECT * FROM builds " + setSortConditionBuilds(sort);
  const { rows } = await pool.query(sortQuery);
  return rows;
}

async function getAllBuilds() {
  const { rows } = await pool.query("SELECT * FROM builds");

  return rows;
}

async function getBuild(buildId) {
  const { rows } = await pool.query("SELECT * FROM builds WHERE id = $1", [
    buildId,
  ]);

  return rows[0];
}

async function deleteBuild(buildId) {
  await pool.query("DELETE FROM builds WHERE id = $1", [buildId]);
}

async function getBuildsRevenue() {
  const { rows } = await pool.query("SELECT SUM(price) FROM builds");

  return rows[0].sum;
}

async function getBuildsNum() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM builds");

  return rows[0].count;
}

module.exports = {
  getAllProducts,
  getProductsInCategory,
  getProductsWithIds,
  addProduct,
  getProduct,
  searchProducts,
  getCategories,
  filterProducts,
  filterProductsBuild,
  updateProduct,
  deleteProduct,
  reduceProductsQuantity,
  resetProductQuantity,
  getProductsNum,
  getProductsQuantity,
  addBuild,
  getBuildPrice,
  filterbuilds,
  getAllBuilds,
  getBuild,
  deleteBuild,
  updateBuild,
  getBuildsRevenue,
  getBuildsNum,
};
