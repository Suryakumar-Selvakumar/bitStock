const encodeImageBase64 = (image, type) =>
  image ? `data:${type};base64,${Buffer.from(image).toString("base64")}` : null;

module.exports = encodeImageBase64;
