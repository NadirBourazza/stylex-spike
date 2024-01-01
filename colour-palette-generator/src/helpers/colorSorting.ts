// Credit to Tomek Dev for information on color sorting in JS
// https://tomekdev.com/posts/sorting-colors-in-js
const colorDistance = (color1: number[], color2: number[]): number => {
  let result = 0;
  for (let i = 0; i < color1.length; i++)
    result += (color1[i] - color2[i]) * (color1[i] - color2[i]);
  return result;
};

const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

const rgbToHex = (rgb: number[]): string => {
  return "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
};

export const sortColors = (colors: string[]): string[] => {
  const rgbColors = colors.map(hexToRgb);

  let distances: [number[], number[], number][] = [];
  for (let i = 0; i < rgbColors.length; i++) {
    for (let j = 0; j < i; j++)
      distances.push([
        rgbColors[i],
        rgbColors[j],
        colorDistance(rgbColors[i], rgbColors[j]),
      ]);
  }
  distances.sort((a, b) => a[2] - b[2]);

  let colorToCluster: { [key: string]: number[][] } = {};
  for (let i = 0; i < rgbColors.length; i++)
    colorToCluster[rgbColors[i].toString()] = [rgbColors[i]];

  let lastCluster: number[][] | undefined;
  for (let i = 0; i < distances.length; i++) {
    let color1 = distances[i][0];
    let color2 = distances[i][1];
    let cluster1 = colorToCluster[color1.toString()];
    let cluster2 = colorToCluster[color2.toString()];
    if (!cluster1 || !cluster2 || cluster1 == cluster2) continue;

    if (color1 != cluster1[cluster1.length - 1]) cluster1.reverse();
    if (color2 != cluster2[0]) cluster2.reverse();

    cluster1.push(...cluster2);
    delete colorToCluster[color1.toString()];
    delete colorToCluster[color2.toString()];
    colorToCluster[cluster1[0].toString()] = cluster1;
    colorToCluster[cluster1[cluster1.length - 1].toString()] = cluster1;
    lastCluster = cluster1;
  }

  return lastCluster ? lastCluster.map((rgb) => rgbToHex(rgb)) : [];
};
