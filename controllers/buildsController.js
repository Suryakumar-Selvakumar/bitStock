// dotenv
require("dotenv").config();

// db
const db = require("../db/queries");

// utils

// controllers
const getBuilds = async (req, res) => {};

const builderGet = async (req, res) => {
  const categories = await db.getCategories();

  res.render("builder", {
    categories,
  });
};

const builderPost = async (req, res) => {};

const editBuildGet = async (req, res) => {};

const editBuildPost = async (req, res) => {};

const deleteBuildGet = async (req, res) => {};

const deleteBuildPost = async (req, res) => {};

const getBuild = async (req, res) => {};

module.exports = {
  getBuilds,
  builderGet,
  builderPost,
  editBuildGet,
  editBuildPost,
  deleteBuildGet,
  deleteBuildPost,
  getBuild,
};
