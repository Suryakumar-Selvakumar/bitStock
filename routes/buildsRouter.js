// Router
const { Router } = require("express");
const buildsRouter = new Router();

// Multer
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Controller
const {
  getBuilds,
  builderGet,
  builderPut,
  builderPost,
  builderCancel,
  editBuildGet,
  editBuildPost,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
} = require("../controllers/buildsController");

// buildsRouter.use((req, res, next) => {
//   console.log(`ProductsRouter received: ${req.method} ${req.url}`);
//   next();
// });

// Routes
buildsRouter.get("/", getBuilds);
buildsRouter.get("/builder", builderGet);
buildsRouter.put("/builder", builderPut);
buildsRouter.post("/builder", upload.single("image"), builderPost);
buildsRouter.get("/builder/cancel", builderCancel);
buildsRouter.get("/edit/:buildId", editBuildGet);
buildsRouter.post("/edit/:buildId", editBuildPost);
buildsRouter.get("/delete/:buildId", deleteBuildGet);
buildsRouter.post("/delete/:buildId", deleteBuildPost);
buildsRouter.get("/:buildId", getBuild);

module.exports = buildsRouter;
