import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#287FF0",

          secondary: "#FFE11B",

          accent: "#FF9F01",

          neutral: "#2b3440",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#388E3C",

          warning: "#FB641B",

          error: "#f87272",
          body: {
            "background-color": "#D3D3D3",
          },
        },
      },
    ],
  },
};
export default config;
