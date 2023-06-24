/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px'
    },
    extend: {
      colors: {
        base: "#ebebf0",
        primary: "#424F5E",
        dark: "#424F5E",
        "gray-100": "#F9FAFB",
        "gray-200": "#EFEFF6",
        "gray-300": "#C1C1CB",
        "gray-500": "#9494A0",
        "red-500": "#FF9E90",
        green: "#32C076",
        purple: "#5856D6",
      },
      boxShadow: {
        'gray-100': '0 0 150px 0 #1C1C1E'
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

