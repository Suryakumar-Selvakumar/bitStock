const setSortConditionBuilds = (sort) => {
  switch (sort) {
    case "buildNameAsc":
      return "ORDER BY build_name";
    case "buildNameDesc":
      return "ORDER BY build_name DESC";
    case "priceAsc":
      return "ORDER BY price";
    case "priceDesc":
      return "ORDER BY price DESC";
    case "builderNameAsc":
      return "ORDER BY builder_name";
    case "builderNameDesc":
      return "ORDER BY builder_name DESC";
  }
};

module.exports = setSortConditionBuilds;
