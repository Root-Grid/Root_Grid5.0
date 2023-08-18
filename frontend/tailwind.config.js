/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white': '#ffffff', // Set the white background color
      },
      mytheme: {
        // Your theme color definitions
        "primary": "#1eafed",
        "secondary": "#a6ed95",
        "accent": "#e8d55a",
        "neutral": "#272a3a",
        "base-100": "#e7e7e9",
        "info": "#9bcbf3", 
        "success": "#1ba77f",
        "warning": "#ad690b",
        "error": "#f16e6a",
      },
    },
  },
  plugins: [require("daisyui")],
};
