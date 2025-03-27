// dotenv
require("dotenv").config();

// db
const db = require("../db/queries");

// utils
const getCategory = require("../utils/getCategory");
const formatFormData = require("../utils/formatFormData");
const brandImage = require("../utils/brandImage");

const getProducts = async (req, res) => {
  const categories = await db.getCategories();
  const { sort, category } = req.query;

  if (sort !== undefined || category !== undefined) {
    const formattedCategory =
      category !== undefined && !Array.isArray(category)
        ? [category]
        : category;
    const products = await db.filterProducts(sort, formattedCategory);
    products.forEach((product) => {
      product.image = product.image
        ? `data:${product.image_type};base64,${product.image?.toString(
            "base64"
          )}`
        : `static/placeholder-image.jpg`;
      delete product.image_type;
      delete product.details;
    });
    res.render("products/products", {
      products: products,
      categories: categories,
      brandImage: brandImage,
      sort: sort,
      checkedCategories: !Array.isArray(category) ? [category] : category,
    });
  } else {
    const products = await db.getAllProducts();
    products.forEach((product) => {
      product.image = product.image
        ? `data:${product.image_type};base64,${product.image?.toString(
            "base64"
          )}`
        : `static/placeholder-image.jpg`;
      delete product.image_type;
      delete product.details;
    });
    res.render("products/products", {
      products: products,
      categories: categories,
      brandImage: brandImage,
      sort: false,
      checkedCategories: [],
    });
  }
};

const addProductsGet = (req, res) => {
  const { category } = req.params;

  res.render("products/add-product", {
    category: category,
    getCategory: getCategory,
  });
};

const chooseCategoryGet = (req, res) => {
  res.render("products/choose-category");
};

const addProductsPost = async (req, res) => {
  const { category } = req.params;
  const newProduct = req.body;

  newProduct.category = category;
  newProduct.image = req.file?.buffer ?? null;
  newProduct.imageType = req.file?.mimetype ?? null;

  await db.addProduct(formatFormData(newProduct));

  res.redirect("/products");
};

const getProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await db.getProduct(productId);

  product.image = product.image
    ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
    : `../static/placeholder-image.jpg`;
  delete product.image_type;

  res.render("products/product-page", {
    product: product,
    category: product.category,
    brandImage: brandImage,
  });
};

const getSearchResults = async (req, res) => {
  const { search } = req.query;

  const products = await db.searchProducts(search);
  products.forEach((product) => {
    product.image = product.image
      ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
      : `static/placeholder-image.jpg`;
    delete product.image_type;
    delete product.details;
  });

  res.render("products/search-products", {
    products: products,
    brandImage: brandImage,
    search: search,
  });
};

const editProductGet = async (req, res) => {
  const { productId } = req.params;

  const product = await db.getProduct(productId);

  product.image = product.image
    ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
    : `../../static/placeholder-image.jpg`;
  delete product.image_type;

  res.render("products/edit-product", {
    product: product,
    category: product.category,
  });
};

const editProductPost = async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;

  updatedProduct.image = req.file?.buffer ?? null;
  updatedProduct.imageType = req.file?.mimetype ?? null;

  const oldProduct = await db.getProduct(productId);
  updatedProduct.category = oldProduct.category;

  const formattedUpdatedProduct = formatFormData(updatedProduct);
  formattedUpdatedProduct.id = parseInt(productId);

  await db.updateProduct(formattedUpdatedProduct);

  res.redirect(`/products/${productId}`);
};

const deleteProductGet = async (req, res) => {
  const { productId } = req.params;

  const product = await db.getProduct(productId);

  product.image = product.image
    ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
    : `../../static/placeholder-image.jpg`;
  delete product.image_type;

  res.render("products/delete-product", {
    product: product,
    brandImage: brandImage,
    category: product.category,
    retry: false,
  });
};

const deleteProductPost = async (req, res) => {
  const { productId } = req.params;
  const { adminPassword } = req.body;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    await db.deleteProduct(productId);
    res.redirect(`/products`);
  } else {
    const product = await db.getProduct(productId);

    product.image = product.image
      ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
      : `../../static/placeholder-image.jpg`;
    delete product.image_type;

    res.render("products/delete-product", {
      product: product,
      brandImage: brandImage,
      category: product.category,
      retry: true,
    });
  }
};

module.exports = {
  getProducts,
  addProductsGet,
  addProductsPost,
  getProduct,
  chooseCategoryGet,
  getSearchResults,
  editProductGet,
  editProductPost,
  deleteProductGet,
  deleteProductPost,
};
