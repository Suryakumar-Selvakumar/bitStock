const getBrandImage = (brand) => {
  switch (brand.trim().toLowerCase()) {
    case "amd":
      return "https://c1.neweggimages.com/brandimage/Brand1028.gif";

    case "asrock":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/ASRock_Logo.svg/1280px-ASRock_Logo.svg.png";

    case "asus":
      return "https://c1.neweggimages.com/brandimage/Brand1315.gif";

    case "be quiet!":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Be-quiet%21_Logo.svg/2560px-Be-quiet%21_Logo.svg.png";

    case "crucial":
      return "https://c1.neweggimages.com/brandimage/Brand1455.gif";

    case "cooler master":
      return "https://c1.neweggimages.com/brandimage/Brand1333.gif";

    case "corsair":
      return "https://c1.neweggimages.com/brandimage/Brand1459.gif";

    case "fractal design":
      return "https://c1.neweggimages.com/brandimage/Brand14581.gif";

    case "intel":
      return "https://c1.neweggimages.com/brandimage/Brand1157.gif";

    case "kingston":
      return "https://upload.wikimedia.org/wikipedia/commons/e/ef/Kingston_Technology_Corporation_logo.png";

    case "lian li":
      return "https://www.asetek.com/wp-content/uploads/2023/10/Lian-Li-LOGO2069x1138-black-1.jpg";

    case "msi":
      return "https://c1.neweggimages.com/brandimage/Brand1312.gif";

    case "nzxt":
      return "https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_NZXT.svg";

    case "arctic":
      return "https://tech-legend.com/wp-content/uploads/2017/02/ARCTIC_logo_blue_h.jpg";

    case "g.skill":
      return "https://c1.neweggimages.com/brandimage/Brand8476.gif";

    case "gigabyte":
      return "https://findvectorlogo.com/wp-content/uploads/2020/02/gigabyte-vector-logo.png";

    case "hyte":
      return "https://support.hyte.com/hc/theming_assets/01HZP6Z46H52GH14NN8FYP0YPG";

    case "samsung":
      return "https://c1.neweggimages.com/brandimage/Brand1077.gif";

    case "sapphire":
      return "https://c1.neweggimages.com/brandimage/Brand1561.gif";

    case "seagate":
      return "https://c1.neweggimages.com/brandimage/Brand1305.gif";

    case "silicon power":
      return "https://c1.neweggimages.com/brandimage/Brand11111.gif";

    case "teamgroup":
      return "https://c1.neweggimages.com/brandimage/Brand11857.gif";

    case "thermalright":
      return "https://cdn.mcc-jo.com/media/Y7oUFiD6H2gQzItqamQ4q8Ogey9yNQiaiNqu6ZWH.png";

    case "thermaltake":
      return "https://c1.neweggimages.com/brandimage/Brand1379.gif";

    case "noctua":
      return "https://elnour-tech.com/wp-content/uploads/2024/11/noctua_logo.webp";

    case "nvidia":
      return "https://c1.neweggimages.com/brandimage/Brand1441.gif";

    case "pny":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/PNY_Technologies_logo.svg/1200px-PNY_Technologies_logo.svg.png";

    case "western digital":
      return "https://c1.neweggimages.com/brandimage/Brand1306.gif";

    case "hp":
      return "https://c1.neweggimages.com/brandimage/Brand1186.gif";

    case "acer":
      return "https://c1.neweggimages.com/brandimage/Brand1146.gif";

    case "dell":
      return "https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png";

    case "lg":
      return "https://c1.neweggimages.com/brandimage/Brand1623.gif";

    case "aoc":
      return "https://upload.wikimedia.org/wikipedia/commons/8/83/Logo_of_AOC_International.png";

    case "razer":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ZZRwwUxdERQWeDYeF3hK4jHs_x1imDZ5PQ&s";

    case "steelseries":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuznEZI0py2LPACwuvw_ZuyGUUfjDoly3Hw&s";

    case "logitech":
      return "https://c1.neweggimages.com/brandimage/Brand1080.gif";

    case "sony":
      return "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg";

    case "rk royal kludge":
      return "https://c1.neweggimages.com/brandimage/Brand222695.gif";

    case "glorious":
      return "https://uspto.report/TM/97698117/mark.png";

    case "silverstone":
      return "https://logos-world.net/wp-content/uploads/2023/01/SilverStone-Logo.png";

    case "cryorig":
      return "https://forum.hardwareinside.de/media/cryorig-logo.85246/full?d=1543253747";

    case "evga":
      return "https://upload.wikimedia.org/wikipedia/commons/e/e9/EVGA_Logo.svg";

    case "pixio":
      return "https://cdn.shopify.com/s/files/1/1208/4426/files/Pixio_Logo_Red_Logo.png?v=1609437152";
  }
};

const brandImageExists = (brand) => {
  const brandImages = [
    "amd",
    "asrock",
    "pixio",
    "logitech",
    "evga",
    "cryorig",
    "asus",
    "cooler master",
    "silverstone",
    "corsair",
    "intel",
    "msi",
    "nzxt",
    "arctic",
    "gigabyte",
    "thermalright",
    "noctua",
    "g.skill",
    "glorious",
    "teamgroup",
    "crucial",
    "silicon power",
    "kingston",
    "rk royal kludge",
    "samsung",
    "sony",
    "western digital",
    "seagate",
    "nvidia",
    "sapphire",
    "pny",
    "thermaltake",
    "be quiet!",
    "lian li",
    "fractal design",
    "hyte",
    "hp",
    "acer",
    "dell",
    "razer",
    "steelseries",
    "lg",
    "aoc",
  ];

  if (brandImages.includes(brand.trim().toLowerCase())) return true;
  else return false;
};

module.exports = { getBrandImage, brandImageExists };
