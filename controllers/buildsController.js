// libs
require("dotenv").config();

// db
const db = require("../db/queries");

// utils
const getCategory = require("../utils/getCategory");
const brandImage = require("../utils/brandImage");
const getBuilderProp = require("../utils/getBuilderProp");
const getPartDetails = require("../utils/getPartDetails");

// controllers
const getBuilds = async (req, res) => {};

const builderGet = async (req, res) => {
  if (!req.session.builder) {
    req.session.builder = {
      buildDetails: {},
      cpuId: null,
      cpuCoolerId: null,
      motherboardId: null,
      memoryId: null,
      storageId: null,
      videoCardId: null,
      powerSupplyId: null,
      caseId: null,
      monitorId: null,
      headphonesId: null,
      keyboardId: null,
      mouseId: null,
    };
  }

  const categories = await db.getCategories();
  const buildPartsValid = Object.values(req.session.builder).filter(
    (id) => id !== null && typeof id !== "object"
  );

  const buildPrice = await db.getBuildPrice(buildPartsValid);
  const currentParts = await db.getProductsWithIds(buildPartsValid);

  req.session.builder.buildDetails.buildPrice = buildPrice;

  categories.forEach((category) => {
    const part = currentParts.filter(
      (part) => category.name === part.category
    )[0];

    category.item = part
      ? {
          id: part.id,
          name: part.name + getPartDetails(part.details, part.category),
          price: part.price,
          quantity: part.quantity,
          image: part.image
            ? `data:${part.image_type};base64,${part.image?.toString("base64")}`
            : `../static/placeholder-image.jpg`,
        }
      : null;
  });

  res.render("builds/builder", {
    categories: categories,
    builder: req.session.builder,
    getCategory,
    error: false,
    buildDetails: req.session.builder.buildDetails,
  });
};

const choosePartGet = async (req, res) => {
  const { buildPart } = req.params;

  const products = await db.filterProducts(null, [buildPart]);
  products.forEach((product) => {
    product.image = product.image
      ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
      : `static/placeholder-image.jpg`;
    delete product.image_type;
    delete product.details;
  });

  res.render("builds/choose-part", {
    products: products,
    brandImage: brandImage,
    buildPart: buildPart,
    getCategory: getCategory,
  });
};

const choosePartPost = async (req, res) => {
  const { buildPart } = req.params;
  const { productId } = req.body;

  req.session.builder[getBuilderProp(buildPart)] = productId;

  res.redirect("/builds/builder");
};

const deletePartGet = async (req, res) => {
  const { buildPart } = req.params;

  req.session.builder[getBuilderProp(buildPart)] = null;

  res.redirect("/builds/builder");
};

const builderPost = async (req, res) => {
  const { buildName, builderName } = req.body;
  const buildParts = req.session.builder;

  const categories = await db.getCategories();
  const buildPartIds = Object.values(buildParts);

  const buildPartIdsValid = buildPartIds.filter(
    (id) => id !== null && typeof id !== "object"
  );
  const buildPrice = await db.getBuildPrice(buildPartIdsValid);

  if (buildPartIds.includes(null)) {
    const currentParts = await db.getProductsWithIds(buildPartIdsValid);

    categories.forEach((category) => {
      const part = currentParts.filter(
        (part) => category.name === part.category
      )[0];
      category.item = part
        ? {
            id: part.id,
            name: part.name + getPartDetails(part.details, part.category),
            price: part.price,
            quantity: part.quantity,
            image: part.image
              ? `data:${part.image_type};base64,${part.image?.toString(
                  "base64"
                )}`
              : `../static/placeholder-image.jpg`,
          }
        : null;
    });

    req.session.builder.buildDetails = {
      builderName: builderName,
      buildName: buildName,
      buildPrice: buildPrice,
    };

    res.render("builds/builder", {
      categories: categories,
      builder: req.session.builder,
      getCategory,
      error: true,
      buildDetails: req.session.builder.buildDetails,
    });
  } else {
    delete buildParts.buildDetails;

    const build = {
      builderName: builderName,
      buildName: buildName,
      price: buildPrice,
      image: req.file?.buffer ?? null,
      imageType: req.file?.mimetype ?? null,
      parts: buildParts,
    };

    await db.addBuild(build);
    req.session.builder = null;
    res.redirect("/builds");
  }
};

const builderCancel = async (req, res) => {
  req.session.builder = null;
  res.redirect("/");
};

const editBuildGet = async (req, res) => {};

const editBuildPost = async (req, res) => {};

const deleteBuildGet = async (req, res) => {};

const deleteBuildPost = async (req, res) => {};

const getBuild = async (req, res) => {};

module.exports = {
  getBuilds,
  builderGet,
  builderPost,
  builderCancel,
  deletePartGet,
  choosePartGet,
  choosePartPost,
  editBuildGet,
  editBuildPost,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
};
