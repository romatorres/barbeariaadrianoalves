/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './**/*.{html,js}',
    './index.html',],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poller One", "cursive"],
        secondary: ["Ubuntu", "sans-serif"],
        tertiary: ["Nunito", "sans-serif"],
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
  plugins: [],
}



