import stylex from "@stylexjs/stylex";
import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { generateRandomPalette } from "../helpers/generatePalette";
import { styles } from "./Styles";

const paletteHeight = 8;
const paletteWidth = 8;

export const ColorPalette = () => {
  const [colors, setColors] = useState(
    generateRandomPalette(paletteHeight, paletteWidth)
  );
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (resetting)
      setColors(generateRandomPalette(paletteHeight, paletteWidth));
    setResetting(false);
  }, [resetting]);

  return (
    <div>
      <ToastContainer />
      <h1 {...stylex.props(styles.title)}>color palette</h1>
      <div {...stylex.props(styles.paletteContainer)}>
        {colors.map((color, index) => {
          return (
            <div
              {...stylex.props(styles.paletteColor)}
              style={{ backgroundColor: color }}
              onClick={() => {
                navigator.clipboard.writeText(color);
                toast.dark(`Copied ${color} to clipboard!`);
              }}
              key={index}
            />
          );
        })}
      </div>
      <button
        {...stylex.props(styles.regenerateButton)}
        onClick={() => !resetting && setResetting(true)}
      >
        {resetting ? (
          <FaSync {...stylex.props(styles.loadingIcon)} />
        ) : (
          "regenerate"
        )}
      </button>
    </div>
  );
};
