/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // morados tipo pantalla de login Ubuntu
        "ubuntu-purple": "#2c001e",
        "ubuntu-purple-light": "#5e17eb",
      },
    },
  },
  plugins: [],
};
