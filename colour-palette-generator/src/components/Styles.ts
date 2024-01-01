import * as stylex from "@stylexjs/stylex";

const loadingAnimation = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const colorPressedAnimation = stylex.keyframes({
  from: { scale: 1 },
  to: { scale: 1.1 },
});

export const styles = stylex.create({
  title: {
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  paletteContainer: {
    width: 500,
    minHeight: 500,
    borderRadius: 12,
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    justifyItems: "center",
    alignItems: "center",
  },
  paletteColor: {
    borderRadius: 8,
    width: 40,
    height: 40,
    border: {
      ":hover": "2px solid white",
    },
    animationName: {
      ":active": colorPressedAnimation,
    },
    animationDuration: {
      ":active": "0.1s",
    },
  },
  regenerateButton: {
    width: 480,
    height: 48,
    borderRadius: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 12,
  },
  loadingIcon: {
    animationName: loadingAnimation,
    animationDuration: "2s",
    animationIterationCount: "infinite",
  },
});
