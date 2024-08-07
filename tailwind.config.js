/** @type {import('tailwindcss').Config} */
export default {
  content:  ["./index.html", "./src/**/*.{js,ts}",  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundColor: ['active'],
      transform: ['active'],
    }
  },
  plugins: [
    require('flowbite/plugin')
],
}

