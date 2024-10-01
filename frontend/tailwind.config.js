/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#9F2B68", // Define a constant color
        secondary: "#c20d6d",
        customBlue: "#4F46E5",
        customGray: "#64748B",
      },
    },
  },
  plugins: [],
};
