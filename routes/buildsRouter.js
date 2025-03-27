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
  builderPost,
  editBuildGet,
  editBuildPost,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
} = require("../controllers/buildsController");

// Routes
buildsRouter.get("/", getBuilds);
buildsRouter.get("/builder", builderGet);
buildsRouter.post("/builder", upload.single("image"), builderPost);
buildsRouter.get("/edit/:buildId", editBuildGet);
buildsRouter.post("/edit/:buildId", editBuildPost);
buildsRouter.get("/delete/:buildId", deleteBuildGet);
buildsRouter.post("/delete/:buildId", deleteBuildPost);
buildsRouter.get("/:buildId", getBuild);

module.exports = buildsRouter;
