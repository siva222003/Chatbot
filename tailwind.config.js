/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        left : "#202123",
        rightQ : "#343541",
        rightA : "#444654"
      },
    },
  },
  plugins: [],
}

