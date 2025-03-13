const { Router } = require("express");
const {
  getProducts,
  addProductsGet,
  addProductsPost,
  getProduct,
  chooseCategoryGet,
} = require("../controllers/productsController");

const productsRouter = new Router();

productsRouter.get("/", getProducts);
productsRouter.get("/new", chooseCategoryGet);
productsRouter.get("/:category/new", addProductsGet);
productsRouter.post("/:category/new", addProductsPost);
productsRouter.get("/:productId", getProduct);

module.exports = productsRouter;
