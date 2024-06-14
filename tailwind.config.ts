import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        left: "860px",
        right: "1100px",
      },
    },
  },
  plugins: [],
};
export default config;
