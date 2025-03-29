const getPartDetails = (details, category) => {
  switch (category) {
    case "cpu":
      return ` ${details.coreClock} ${details.coreCount}-Core Processor`;
    case "cpu-cooler":
      return ` CPU Cooler`;
    case "motherboard":
      return ` ${details.formFactor} ${details.socket} Motherboard`;
    case "memory":
      return ` (${details.modules}) ${details.speed} CL${details.casLatency} Memory`;
    case "storage": {
      let name = ` ${details.capacity} ${details.formFactor}`;
      const interfaceName =
        details.formFactor === "M.2-2280"
          ? details.interface.replace("M.2 ", "")
          : details.interface;
      const driveName = details.type.includes("RPM")
        ? "Internal Hard Drive"
        : "NVME Solid State Drive";
      return `${name} ${interfaceName} ${driveName}`;
    }
    case "video-card":
      return ` ${details.chipset} ${details.memory} Video Card`;
    case "power-supply": {
      let name = ` ${details.wattage} ${details.efficiencyRating}`;
      let modular = "";
      if (details.modular === "Full") {
        modular = "Fully Modular";
      } else if (details.modular === "Semi") {
        modular = "Semi-modular";
      } else {
        modular = "";
      }
      return `${name} ${modular} ${details.type} Power Supply`;
    }
    case "case":
      return ` ${details.type} Case`;
    case "monitor":
      return ` ${details.screenSize} ${details.resolution} ${details.refreshRate} Monitor`;
    case "headphones":
      return ` Headset`;
    case "keyboard":
      return ` ${details.connectionType
        .split(", ")
        .reverse()
        .join("/")
        .replace("Bluetooth Wireless", "Bluetooth")} ${details.style} Keyboard`;
    case "mouse":
      return ` ${details.connectionType
        .split(", ")
        .reverse()
        .join("/")
        .replace("Bluetooth Wireless", "Bluetooth")} Mouse`;
  }
};

module.exports = getPartDetails;
