const getCategory = (category) => {
  if (category === "cpu") {
    return "CPU";
  } else if (category === "cpu-cooler") {
    return "CPU Cooler";
  } else if (category === "motherboard") {
    return "Motherboard";
  } else if (category === "memory") {
    return "Memory";
  } else if (category === "storage") {
    return "Storage";
  } else if (category === "video-card") {
    return "Video Card";
  } else if (category === "power-supply") {
    return "Power Supply";
  } else if (category === "case") {
    return "Case";
  } else if (category === "monitor") {
    return "Monitor";
  } else if (category === "headphones") {
    return "Headset";
  } else if (category === "keyboard") {
    return "Keyboard";
  } else if (category === "mouse") {
    return "Mouse";
  }
};

module.exports = getCategory;
