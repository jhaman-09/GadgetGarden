/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#E90074",
        secondary: "#FB2576",
        customBlue: "#4F46E5",
        customGray: "#64748B",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px 2px rgba(194, 13, 109, 0.5)", // Stable glow at the start and end
          },
          "50%": {
            boxShadow: "0 0 20px 4px rgba(194, 13, 109, 0.7)", // Brighter glow at the middle, but not pulsing
          },
        },
      },
      animation: {
        glow: "glow 2.0s infinite", // Use 'forwards' to keep the final state
      },
    },
  },
  plugins: [],
};
