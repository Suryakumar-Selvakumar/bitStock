const setSortCondition = (sort) => {
  switch (sort) {
    case "nameAsc":
      return "ORDER BY name";
    case "nameDesc":
      return "ORDER BY name DESC";
    case "priceAsc":
      return "ORDER BY price";
    case "priceDesc":
      return "ORDER BY price DESC";
    case "quantityAsc":
      return "ORDER BY quantity";
    case "quantityDesc":
      return "ORDER BY quantity DESC";
  }
};

module.exports = setSortCondition;
