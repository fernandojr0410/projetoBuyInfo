/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#04709f",
        secondary: "#5dade2",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
