const db = require("../db/queries");

const getProducts = async (req, res) => {
  const products = await db.getAllProducts();

  res.render("products/products", { products: products });
};

const addProductsGet = async (req, res) => {
  res.render("products/add-product");
};

const addProductsPost = async (req, res) => {
  const {} = req.body;
};

const getProduct = async (req, res) => {
  const product = await db.getProduct();

  res.render("products/product-page", { product: product });
};

module.exports = { getProducts, addProductsGet, addProductsPost };
