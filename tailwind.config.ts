import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        paper: "#f7f8f5",
        mint: "#1f8a70",
        coral: "#d95550",
        steel: "#4c6f8f"
      },
      boxShadow: {
        soft: "0 16px 45px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
