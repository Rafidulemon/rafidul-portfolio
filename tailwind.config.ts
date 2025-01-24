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
        primary: "#00BCD4",
        tertiary: "#F44336",
        primary_light: "#B2EBF2",
      },
    },
  },
  plugins: [],
};
export default config;
