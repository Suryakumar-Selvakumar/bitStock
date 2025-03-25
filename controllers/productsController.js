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
        : `placeholder-image.jpg`;
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
        : `placeholder-image.jpg`;
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
  const product = await db.getProduct();

  res.render("products/product-page", { product: product });
};

const getSearchResults = async (req, res) => {
  const { search } = req.query;

  console.log(search);

  const products = await db.searchProducts(search);
  products.forEach((product) => {
    product.image = product.image
      ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
      : `placeholder-image.jpg`;
    delete product.image_type;
    delete product.details;
  });

  res.render("products/search-products", {
    products: products,
    brandImage: brandImage,
    search: search,
  });
};

module.exports = {
  getProducts,
  addProductsGet,
  addProductsPost,
  getProduct,
  chooseCategoryGet,
  getSearchResults,
};
