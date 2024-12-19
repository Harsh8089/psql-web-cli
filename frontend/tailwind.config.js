/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          '950': "#1e293b",
          '200': "#62a3c5",
          '800': "#1e293b",
          '700': "#293548",
          '100': "#77c8ef"
        },
        purple: {
          '400': "#f472b6",
        },
        slate: {
          '200': "#d9dde1",
          '700': "#344156",
          '100': "#e9ebee"
        }
      }
    },
  },
  plugins: [],
}

