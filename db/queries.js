const pool = require("./pool");

// utils
const setSortCondition = require("../utils/setSortCondition");

// Product Queries
async function getAllProducts() {
  const { rows } = await pool.query(
    "SELECT SETSEED(1), * FROM products ORDER BY RANDOM()"
  );

  return rows;
}

async function getProductsInCategory(category) {
  const { rows } = pool.query("SELECT * FROM products WHERE category=$1", [
    category,
  ]);

  return rows;
}

async function getProductsWithIds(productIds) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = ANY($1)", [
    productIds,
  ]);

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

// Build Queries
async function addBuild(newBuild) {
  await pool.query(
    "INSERT INTO builds (builder_name, build_name, price, image, image_type, parts) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      newBuild.builderName,
      newBuild.buildName,
      newBuild.price,
      newBuild.image,
      newBuild.imageType,
      JSON.stringify(newBuild.parts),
    ]
  );
}

async function getBuildPrice(partIds) {
  const { rows } = await pool.query(
    "SELECT SUM(price) FROM products WHERE id = ANY($1)",
    [partIds]
  );

  return rows[0].sum;
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
  updateProduct,
  deleteProduct,
  addBuild,
  getBuildPrice,
};
