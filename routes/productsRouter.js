const { Router } = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = new Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/new", productsController.addProductsGet);
productsRouter.post("/new", productsController.addProductsPost);
productsRouter.get("/:productId", productsController.getProduct);

module.exports = productsRouter;
