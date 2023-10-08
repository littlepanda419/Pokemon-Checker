import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 加入 darkMode
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        whosthatpokemon: {
          "0%": { filter: "brightness(0)" },
          "50%": { filter: "brightness(0.5)" },
          "100%": { filter: "brightness(1)" },
        },
      },
      animation: {
        whosthatpokemon: "whosthatpokemon 3s linear",
      },
    },
  },
  plugins: [],
};
export default config;
