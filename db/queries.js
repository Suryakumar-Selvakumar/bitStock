const pool = require("./pool");

async function getAllProducts() {
  const { rows } = pool.query("SELECT * FROM products");

  return rows;
}

async function getProductsInCategory(category) {
  const { rows } = pool.query("SELECT * FROM products WHERE category=$1", [
    category,
  ]);

  return rows;
}

async function addCategory(newCategory) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [newCategory]);
}

async function addProduct(newProduct) {}

async function getProduct(productId) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [
    productId,
  ]);

  return rows[0];
}

async function searchProducts(searchKey) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE name LIKE '%' || $1 || '%'",
    [searchKey]
  );
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

module.exports = {
  getAllProducts,
  getProductsInCategory,
  addCategory,
  addProduct,
  getProduct,
  searchProducts,
  getCategories,
};
