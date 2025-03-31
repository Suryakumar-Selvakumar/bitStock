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
    case "buildForAsc":
      return "ORDER BY build_for";
    case "buildForDesc":
      return "ORDER BY build_for DESC";
  }
};

module.exports = setSortConditionBuilds;
