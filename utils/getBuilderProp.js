const getBuilderProp = (category) => {
  switch (category) {
    case "cpu":
      return "cpuId";
    case "cpu-cooler":
      return "cpuCoolerId";
    case "motherboard":
      return "motherboardId";
    case "memory":
      return "memoryId";
    case "storage":
      return "storageId";
    case "video-card":
      return "videoCardId";
    case "power-supply":
      return "powerSupplyId";
    case "case":
      return "caseId";
    case "monitor":
      return "monitorId";
    case "headphones":
      return "headphonesId";
    case "keyboard":
      return "keyboardId";
    case "mouse":
      return "mouseId";
  }
};

module.exports = getBuilderProp;
