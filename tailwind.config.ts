import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        antro: ["var(--antro-font)"],
        iran: ["var(--iransans-font)"],
      },
      boxShadow: {
        "custom-shadow": "0px 3px 6px 0px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
