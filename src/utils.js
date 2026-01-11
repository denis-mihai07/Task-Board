export const hexToRGB = (hex) => {
  hex = hex.replace("#", "");
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  return [red, green, blue];
};

export const getAverageRGB = (rgb1, rgb2) => {
  const averageRGB = [rgb1[0] + rgb2[0], rgb1[1] + rgb2[1], rgb1[2] + rgb2[2]];
  return averageRGB;
};
