import { sortColors } from "./colorSorting";

const generateHexcolor = () => {
  // Generate raw hex code
  const hexCode = (Math.random() * 0xfffff * 1000000).toString(16);

  // Add hash
  return "#" + hexCode.slice(0, 6);
};

export const generateRandomPalette = (
  paletteHeight: number,
  paletteWidth: number
) => {
  let colors: string[] = [];

  for (let i = 0; i < paletteHeight * paletteWidth; i++) {
    colors.push(generateHexcolor());
  }

  return sortColors(colors);
};
