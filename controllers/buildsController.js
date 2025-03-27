// dotenv
require("dotenv").config();

// db
const db = require("../db/queries");

// utils
const getCategory = require("../utils/getCategory");

// controllers
const getBuilds = async (req, res) => {};

const builderGet = async (req, res) => {
  await db.deleteBuilder();
  await db.createBuilder();
  const builder = await db.getBuilder();

  const categories = await db.getCategories();

  res.render("builds/builder", {
    categories: categories,
    builder: builder,
    getCategory,
  });
};

const builderPut = async (req, res) => {};

const builderPost = async (req, res) => {};

const builderCancel = async (req, res) => {
  await db.deleteBuilder();

  console.log(1);

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
  builderPut,
  builderPost,
  builderCancel,
  editBuildGet,
  editBuildPost,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
};
