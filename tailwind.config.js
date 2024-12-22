/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'bg': "url('./src/images/bg.jpg')",
      },
      borderRadius: {
        '3xl': '26px',
        '4xl': '45px',
      },
    },
    plugins: [],
  }
}