const getBrandImage = (brand) => {
  switch (brand) {
    case "AMD":
      return "https://c1.neweggimages.com/brandimage/Brand1028.gif";

    case "AsRock":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/ASRock_Logo.svg/1280px-ASRock_Logo.svg.png";

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

    case "NZXT":
      return "https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_NZXT.svg";

    case "ARCTIC":
      return "https://tech-legend.com/wp-content/uploads/2017/02/ARCTIC_logo_blue_h.jpg";

    case "Gigabyte":
      return "https://findvectorlogo.com/wp-content/uploads/2020/02/gigabyte-vector-logo.png";

    case "Thermalright":
      return "https://cdn.mcc-jo.com/media/Y7oUFiD6H2gQzItqamQ4q8Ogey9yNQiaiNqu6ZWH.png";

    case "Noctua":
      return "https://elnour-tech.com/wp-content/uploads/2024/11/noctua_logo.webp";
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
    "NZXT",
    "ARCTIC",
    "Gigabyte",
    "Thermalright",
    "Noctua",
  ];

  if (brandImages.includes(brand)) return true;
  else return false;
};

module.exports = { getBrandImage, brandImageExists };
