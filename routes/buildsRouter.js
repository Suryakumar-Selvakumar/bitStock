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
  builderCancel,
  deletePartGet,
  choosePartGet,
  choosePartPost,
  editBuildGet,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
} = require("../controllers/buildsController");

// buildsRouter.use((req, res, next) => {
//   console.log(`buildsRouter received: ${req.method} ${req.url}`);
//   next();
// });

// Routes
buildsRouter.get("/", getBuilds);
buildsRouter.get("/builder", builderGet);
buildsRouter.post("/builder", upload.single("image"), builderPost);
buildsRouter.get("/builder/cancel", builderCancel);
buildsRouter.get("/builder/delete/:buildPart", deletePartGet);
buildsRouter.get("/builder/:buildPart", choosePartGet);
buildsRouter.post("/builder/:buildPart", choosePartPost);
buildsRouter.get("/edit/:buildId", editBuildGet);
buildsRouter.get("/delete/:buildId", deleteBuildGet);
buildsRouter.post("/delete/:buildId", deleteBuildPost);
buildsRouter.get("/:buildId", getBuild);

module.exports = buildsRouter;
