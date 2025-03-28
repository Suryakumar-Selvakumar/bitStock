const getBuilderColumnName = (category) => {
  switch (category) {
    case "cpu":
      return "cpu_id";
    case "cpu-cooler":
      return "cpu_cooler_id";
    case "motherboard":
      return "motherboard_id";
    case "memory":
      return "memory_id";
    case "storage":
      return "storage_id";
    case "video-card":
      return "video_card_id";
    case "power-supply":
      return "power_supply_id";
    case "case":
      return "case_id";
    case "monitor":
      return "monitor_id";
    case "headphones":
      return "headphones_id";
    case "keyboard":
      return "keyboard_id";
    case "mouse":
      return "mouse_id";
  }
};

module.exports = getBuilderColumnName;