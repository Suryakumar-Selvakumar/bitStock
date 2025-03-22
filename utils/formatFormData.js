const formatFormData = (newProduct) => {
  const category = newProduct.category;
  let productDetails = {};

  switch (category) {
    case "cpu": {
      productDetails = {
        coreCount: newProduct.coreCount,
        coreClock: newProduct.coreClock + " GHz",
        boostClock: newProduct.boostClock + " GHz",
        microArchitecture: newProduct.microArchitecture,
        tdp: newProduct.tdp + " W",
        integratedGPU: newProduct.integratedGPU,
      };
      break;
    }
    case "cpu-cooler": {
      productDetails = {
        fanRPMMin: newProduct.fanRPMMin + " RPM",
        fanRPMMax: newProduct.fanRPMMax + " RPM",
        noiseLevelMin: newProduct.noiseLevelMin + " dB",
        noiseLevelMax: newProduct.noiseLevelMax + " dB",
        color: newProduct.color,
        radiatorSize:
          newProduct.radiatorSize === "None"
            ? newProduct.radiatorSize
            : newProduct.radiatorSize + " mm",
      };
      break;
    }
    case "motherboard": {
      productDetails = {
        socket: newProduct.socket,
        formFactor: newProduct.formFactor,
        memoryMax: newProduct.memoryMax + " GB",
        memorySlots: newProduct.memorySlots,
        color: newProduct.color,
      };
      break;
    }
    case "memory": {
      productDetails = {
        speed: newProduct.speed,
        modules: newProduct.modules,
        color: newProduct.color,
        firstWordLatency: newProduct.firstWordLatency + " ns",
        casLatency: newProduct.casLatency,
      };
      break;
    }
    case "storage": {
      productDetails = {
        capacity: newProduct.capacity + " TB",
        type: newProduct.type,
        cache: newProduct.cache + " MB",
        formFactor: newProduct.formFactor,
        interface: newProduct.interface,
      };
      break;
    }
    case "video-card": {
      productDetails = {
        chipset: newProduct.chipset,
        memory: newProduct.memory + " GB",
        coreClock: newProduct.coreClock + " MHz",
        boostClock: newProduct.boostClock + " MHz",
        color: newProduct.color,
        length: newProduct.length + " mm",
      };
      break;
    }
    case "power-supply": {
      productDetails = {
        type: newProduct.type,
        efficiencyRating: "80+" + newProduct.efficiencyRating,
        modular: newProduct.modular,
        wattage: newProduct.wattage + " W",
        color: newProduct.color,
      };
      break;
    }
    case "case": {
      productDetails = {
        type: newProduct.type,
        color: newProduct.color,
        sidePanel: newProduct.sidePanel,
        externalVolume: newProduct.externalVolume + " L",
        hdBays: newProduct.hdBays,
      };
      break;
    }
    case "monitor": {
      productDetails = {
        screenSize: newProduct.screenSize + '"',
        resolution: newProduct.resolution,
        refreshRate: newProduct.refreshRate + " Hz",
        responseTime: newProduct.responseTime + " ms",
        panelType: newProduct.panelType,
        aspectRatio: newProduct.aspectRatio,
      };
      break;
    }
    case "headphones": {
      productDetails = {
        frequencyResponse: newProduct.frequencyResponse,
        color: newProduct.color,
        microphone: newProduct.microphone ? "Yes" : "No",
        wireless: newProduct.wireless ? "Yes" : "No",
      };
      break;
    }
    case "keyboard": {
      productDetails = {
        switchType: newProduct.switchType,
        backlit: newProduct.backlit,
        style: newProduct.style,
        connectionType: Array.isArray(newProduct.connectionType)
          ? newProduct.connectionType.join(", ")
          : newProduct.connectionType,
        tenkeyless: newProduct.tenkeyless ? "Yes" : "No",
        color: newProduct.color,
      };
      break;
    }
    case "mouse": {
      productDetails = {
        maximumDPI: newProduct.maximumDPI,
        color: newProduct.color,
        handOrientation: newProduct.handOrientation,
        connectionType: Array.isArray(newProduct.connectionType)
          ? newProduct.connectionType.join(", ")
          : newProduct.connectionType,
      };
      break;
    }
  }

  return {
    name: newProduct.name,
    category: category,
    price: parseFloat(newProduct.price),
    brand: newProduct.brand,
    quantity: Number(newProduct.quantity),
    image: newProduct.image,
    imageType: newProduct.imageType,
    details: productDetails,
  };
};

module.exports = formatFormData;
