const getBrandImage = (brand) => {
  switch (brand) {
    case "AMD":
      return "https://c1.neweggimages.com/brandimage/Brand1028.gif";

    case "AsRock":
      return "https://c1.neweggimages.com/brandimage/Brand1312.gif";

    case "Asus":
      return "https://c1.neweggimages.com/brandimage/Brand1315.gif";

    case "Cooler Master":
      return "https://c1.neweggimages.com/brandimage/Brand1333.gif";

    case "Corsair":
      return "https://c1.neweggimages.com/brandimage/Brand1459.gif";

    case "Intel":
      return "https://c1.neweggimages.com/brandimage/Brand1157.gif";

    case "MSI":
      return "https://c1.neweggimages.com/brandimage/Brand1312.gif";
  }
};

const brandImageExists = (brand) => {
  const brandImages = [
    "AMD",
    "AsRock",
    "Asus",
    "Cooler Master",
    "Corsair",
    "Intel",
    "MSI",
  ];

  if (brandImages.includes(brand)) return true;
  else return false;
};

module.exports = { getBrandImage, brandImageExists };
