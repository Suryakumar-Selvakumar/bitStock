const { Router } = require("express");
const multer = require("multer");

// configure multer
const upload = multer({ storage: multer.memoryStorage() });

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
productsRouter.post("/:category/new", upload.single("image"), addProductsPost);
productsRouter.get("/:productId", getProduct);

module.exports = productsRouter;
