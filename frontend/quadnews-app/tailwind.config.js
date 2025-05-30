/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors used in the Project
        primary: "#3a7ff9",
        secondary: "#EF863E",
      },
      fontFamily: {
        wsans: ['Work Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
