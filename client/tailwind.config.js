/** @type {import('tailwindcss').Config} */
import lineClamp from "@tailwindcss/line-clamp";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        megenta: "#C8202F ",
        blue: "#261F62 ",
      },
    },
  },
  plugins: [lineClamp],
};
