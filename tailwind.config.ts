import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "280px",
      md: "768px",
      lg: "1440px",
      xl: "1920px",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      montserrat: '"Montserrat Alternates", sans-serif',
      plaster: '"Plaster", cursive',
      mplus_1p: '"M PLUS 1p", sans-serif',
      notable: '"Notable", sans-serif',
      nosifer: '"Nosifer Caps"',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        action: "#F7F8F9",
        black: "#030202",
        link: "#2D71C1",
        pink: "#F4DDE8",
        pending: "#FFBE0A",
        uncompleted: "#EC232D",
        unselected: "#D9D9D9",
        error: "#AD1B24",
        cast: "#FC5B8B",
        management: "#295C7A",
        primary: "#FF00FF",
      },
    },
  },
  plugins: [],
};
export default config;
