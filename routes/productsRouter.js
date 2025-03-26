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
  getSearchResults,
  editProductGet,
  editProductPost,
} = require("../controllers/productsController");

const productsRouter = new Router();

// productsRouter.use((req, res, next) => {
//   console.log(`ProductsRouter received: ${req.method} ${req.url}`);
//   next();
// });

productsRouter.get("/", getProducts);
productsRouter.get("/new", chooseCategoryGet);
productsRouter.get("/search", getSearchResults);
productsRouter.get("/edit/:productId", editProductGet);
productsRouter.post("/edit/:productId", upload.single("image"), editProductPost);
productsRouter.get("/:category/new", addProductsGet);
productsRouter.post("/:category/new", upload.single("image"), addProductsPost);
productsRouter.get("/:productId", getProduct);

module.exports = productsRouter;
