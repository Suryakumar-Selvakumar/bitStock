const getCategory = (category, isRequired) => {
  if (category === "cpu") {
    return isRequired ? "CPU*" : "CPU";
  } else if (category === "cpu-cooler") {
    return isRequired ? "CPU Cooler*" : "CPU Cooler";
  } else if (category === "motherboard") {
    return isRequired ? "Motherboard*" : "Motherboard";
  } else if (category === "memory") {
    return isRequired ? "Memory*" : "Memory";
  } else if (category === "storage") {
    return isRequired ? "Storage*" : "Storage";
  } else if (category === "video-card") {
    return isRequired ? "Video Card*" : "Video Card";
  } else if (category === "power-supply") {
    return isRequired ? "Power Supply*" : "Power Supply";
  } else if (category === "case") {
    return isRequired ? "Case*" : "Case";
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
