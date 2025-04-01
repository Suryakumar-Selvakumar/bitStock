// libs
require("dotenv").config();

// db
const db = require("../db/queries");

// utils
const getCategory = require("../utils/getCategory");
const brandImage = require("../utils/brandImage");
const getBuilderProp = require("../utils/getBuilderProp");
const getPartDetails = require("../utils/getPartDetails");
const encodeImageBase64 = require("../utils/encodeImageBase64");

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

  const builder = req.session.builder;

  const categories = await db.getCategories();
  const buildPartsValid = Object.values(builder).filter(
    (id) => id !== null && typeof id !== "object" && typeof id !== "boolean"
  );

  const buildPrice = await db.getBuildPrice(buildPartsValid);
  builder.buildDetails.buildPrice = buildPrice;

  if (builder.buildDetails.image?.data) {
    builder.buildDetails.image = encodeImageBase64(
      builder.buildDetails.image?.data,
      builder.buildDetails.imageType
    );
  }

  const currentParts = await db.getProductsWithIds(buildPartsValid);

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
    builder: builder,
    getCategory,
    error: false,
    buildDetails: builder.buildDetails,
  });
};

const choosePartGet = async (req, res) => {
  const { buildPart } = req.params;

  if (req.session.builder.edit) {
    const build = await db.getBuild(req.session.builder.buildDetails.buildId);
    if (
      build.parts[getBuilderProp(buildPart)] ==
      req.session.builder[getBuilderProp(buildPart)]
    ) {
      await db.resetProductQuantity(
        req.session.builder[getBuilderProp(buildPart)]
      );
    }
  }

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

  if (req.session.builder.edit) {
    const build = await db.getBuild(req.session.builder.buildDetails.buildId);
    if (build.parts[getBuilderProp(buildPart)] == productId) {
      await db.reduceProductsQuantity([productId]);
    }
  }

  req.session.builder[getBuilderProp(buildPart)] = productId;

  res.redirect("/builds/builder");
};

const deletePartGet = async (req, res) => {
  const { buildPart } = req.params;

  if (req.session.builder.edit) {
    const build = await db.getBuild(req.session.builder.buildDetails.buildId);
    if (
      build.parts[getBuilderProp(buildPart)] ==
      req.session.builder[getBuilderProp(buildPart)]
    ) {
      await db.resetProductQuantity(
        req.session.builder[getBuilderProp(buildPart)]
      );
    }
  }

  req.session.builder[getBuilderProp(buildPart)] = null;

  res.redirect("/builds/builder");
};

const builderPost = async (req, res) => {
  const { buildName, buildFor } = req.body;
  const builder = req.session.builder;

  const builderData = Object.values(req.session.builder);

  const buildPartsValid = Object.values(builder).filter(
    (id) => id !== null && typeof id !== "object" && typeof id !== "boolean"
  );
  const buildPrice = await db.getBuildPrice(buildPartsValid);

  if (builderData.slice(1, 9).includes(null)) {
    const categories = await db.getCategories();
    const currentParts = await db.getProductsWithIds(buildPartsValid);

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

    builder.buildDetails.buildFor = buildFor;
    builder.buildDetails.buildName = buildName;
    builder.buildDetails.buildPrice = buildPrice;

    res.render("builds/builder", {
      categories: categories,
      builder: builder,
      getCategory,
      error: true,
      buildDetails: builder.buildDetails,
    });
  } else {
    const filteredBuildParts = Object.fromEntries(
      Object.entries(builder).filter(([_, value]) => typeof value === "string")
    );

    const build = {
      buildFor: buildFor,
      buildName: buildName,
      price: buildPrice,
      image: req.file?.buffer ?? null,
      imageType: req.file?.mimetype ?? null,
      parts: filteredBuildParts,
    };

    if (builder.edit) {
      build.buildId = builder.buildDetails.buildId;
      const dbBuild = await db.getBuild(build.buildId);
      const buildPartsUpdated = buildPartsValid.filter(
        (part) => !Object.values(dbBuild.parts).includes(part)
      );
      await db.updateBuild(build);
      if (buildPartsUpdated.length) {
        await db.reduceProductsQuantity(buildPartsUpdated);
      }
      req.session.builder = null;
      res.redirect(`/builds/${build.buildId}`);
    } else {
      await db.addBuild(build);
      await db.reduceProductsQuantity(buildPartsValid);
      req.session.builder = null;
      res.redirect("/builds");
    }
  }
};

const builderCancel = async (req, res) => {
  if (req.session?.builder.edit) {
    const buildId = req.session.builder.buildDetails.buildId;
    req.session.builder = null;
    res.redirect(`/builds/${buildId}`);
  } else {
    req.session.builder = null;
    res.redirect("/");
  }
};

const editBuildGet = async (req, res) => {
  const { buildId } = req.params;
  const build = await db.getBuild(buildId);

  req.session.builder = {
    buildDetails: {
      buildId: build.id,
      buildFor: build.build_for,
      buildName: build.build_name,
      buildPrice: build.price,
      image: build.image,
      imageType: build.image_type,
    },
    cpuId: build.parts.cpuId ?? null,
    cpuCoolerId: build.parts.cpuCoolerId ?? null,
    motherboardId: build.parts.motherboardId ?? null,
    memoryId: build.parts.memoryId ?? null,
    storageId: build.parts.storageId ?? null,
    videoCardId: build.parts.videoCardId ?? null,
    powerSupplyId: build.parts.powerSupplyId ?? null,
    caseId: build.parts.caseId ?? null,
    monitorId: build.parts.monitorId ?? null,
    headphonesId: build.parts.headphonesId ?? null,
    keyboardId: build.parts.keyboardId ?? null,
    mouseId: build.parts.mouseId ?? null,
    edit: true,
  };

  res.redirect("/builds/builder");
};

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
