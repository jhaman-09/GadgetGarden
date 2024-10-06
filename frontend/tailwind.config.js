/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#c20d6d", // Define a constant color  #c20d6d
        secondary: "#ec4899",
        customBlue: "#4F46E5",
        customGray: "#64748B",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px 2px rgba(194, 13, 109, 0.5)", // Adjusted to #C20D6D
          },
          "50%": {
            boxShadow: "0 0 20px 4px rgba(194, 13, 109, 0.7)", // Increased intensity at mid-point
          },
        },
      },
      animation: {
        glow: "glow 1.5s infinite",
      },
    },
  },
  plugins: [],
};
