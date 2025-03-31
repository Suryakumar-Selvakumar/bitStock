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
const getBuilds = async (req, res) => {
  const { sort } = req.query;

  if (sort !== undefined) {
    const builds = await db.filterbuilds(sort);

    const formattedBuilds = await Promise.all(
      builds.map(async (build) => {
        build.image = build.image
          ? `data:${build.image_type};base64,${build.image?.toString("base64")}`
          : `static/placeholder-image.jpg`;
        delete build.image_type;
        delete build.image_type;
        const cpu = await db.getProduct(build.parts.cpuId);
        build.cpu = cpu.name;
        const gpu = await db.getProduct(build.parts.videoCardId);
        build.gpu = gpu.details.chipset;
        delete build.parts;
        return build;
      })
    );

    res.render("builds/builds", {
      builds: formattedBuilds,
      sort: sort,
    });
  } else {
    const builds = await db.getAllBuilds();

    const formattedBuilds = await Promise.all(
      builds.map(async (build) => {
        build.image = build.image
          ? `data:${build.image_type};base64,${build.image?.toString("base64")}`
          : `static/placeholder-image.jpg`;
        delete build.image_type;
        delete build.image_type;
        const cpu = await db.getProduct(build.parts.cpuId);
        build.cpu = cpu.name;
        const gpu = await db.getProduct(build.parts.videoCardId);
        build.gpu = gpu.details.chipset;
        delete build.parts;
        return build;
      })
    );

    res.render("builds/builds", {
      builds: formattedBuilds,
      sort: sort,
    });
  }
};

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

  const products = await db.filterProductsBuild([buildPart]);
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

  await db.resetProductQuantity(req.session.builder[getBuilderProp(buildPart)]);

  req.session.builder[getBuilderProp(buildPart)] = null;

  res.redirect("/builds/builder");
};

const builderPost = async (req, res) => {
  const { buildName, buildFor } = req.body;
  const buildParts = req.session.builder;

  const categories = await db.getCategories();
  const buildPartIds = Object.values(buildParts);

  const buildPartIdsValid = buildPartIds.filter(
    (id) => id !== null && typeof id !== "object"
  );
  const buildPrice = await db.getBuildPrice(buildPartIdsValid);

  const buildPartIdsRequired = buildPartIds.slice(1, 9);

  if (buildPartIdsRequired.includes(null)) {
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
      buildFor: buildFor,
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
    const filteredBuildParts = Object.fromEntries(
      Object.entries(buildParts).filter(
        ([_, value]) => typeof value === "string"
      )
    );

    const build = {
      buildFor: buildFor,
      buildName: buildName,
      price: buildPrice,
      image: req.file?.buffer ?? null,
      imageType: req.file?.mimetype ?? null,
      parts: filteredBuildParts,
    };

    await db.addBuild(build);
    await db.reduceProductsQuantity(buildPartIdsValid);
    req.session.builder = null;
    res.redirect("/builds");
  }
};

const builderCancel = async (req, res) => {
  req.session.builder = null;
  res.redirect("/");
};

const getBuild = async (req, res) => {
  const { buildId } = req.params;

  const build = await db.getBuild(buildId);

  build.image = build.image
    ? `data:${build.image_type};base64,${build.image?.toString("base64")}`
    : `../static/placeholder-image.jpg`;
  delete build.image_type;

  const buildPartIds = Object.values(build.parts);

  const buildParts = await db.getProductsWithIds(buildPartIds);
  buildParts.forEach((product) => {
    product.image = product.image
      ? `data:${product.image_type};base64,${product.image?.toString("base64")}`
      : `static/placeholder-image.jpg`;
    delete product.image_type;
    delete product.details;
  });

  build.parts = buildParts;

  res.render("builds/build-page", {
    build: build,
    brandImage: brandImage,
  });
};

const editBuildGet = async (req, res) => {};

const editBuildPost = async (req, res) => {};

const deleteBuildGet = async (req, res) => {
  const { buildId } = req.params;

  const build = await db.getBuild(buildId);

  build.image = build.image
    ? `data:${build.image_type};base64,${build.image?.toString("base64")}`
    : `../../static/placeholder-image.jpg`;
  delete build.image_type;
  delete build.parts;

  res.render("builds/delete-build", {
    build: build,
    retry: false,
  });
};

const deleteBuildPost = async (req, res) => {
  const { buildId } = req.params;
  const { adminPassword } = req.body;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    await db.deleteBuild(buildId);
    res.redirect(`/builds`);
  } else {
    const build = await db.getBuild(buildId);

    build.image = build.image
      ? `data:${build.image_type};base64,${build.image?.toString("base64")}`
      : `../../static/placeholder-image.jpg`;
    delete build.image_type;
    delete build.parts;

    res.render("builds/delete-build", {
      build: build,
      retry: true,
    });
  }
};

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
