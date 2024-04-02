export function getImageType(base64Data) {
  return base64Data.split(";")[0].split("/")[1];
}
