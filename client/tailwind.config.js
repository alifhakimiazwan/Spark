/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Poppins"', "sans-serif"], // Add your custom font here
      },
      colors: {
        teal: "#00B1A5",
        navy: "#29285E",
        lightGray: "#F4F4FC",
        olive: "#B8BA00",
        black: "#000000",
      },
    },
  },
  plugins: [
    require("daisyui"), // Correctly importing daisyUI
  ],
  daisyui: {
    themes: ["emerald"],
  },
};
