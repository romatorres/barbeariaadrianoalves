/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poller One", "cursive"],
        secondary: ["Ubuntu", "sans-serif"],
      },
      colors: {
        primary: "#E2C244",
        secondary: "#F5EBC3",
        background: "#0E0D05",
        black_secondary: "#171407",
        gray: {
          "01": "#26272B",
          "02": "#4E525B",
          "03": "#838896",
        },
        white: "#FAF3DC",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
