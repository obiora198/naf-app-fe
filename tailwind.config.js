/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "naf-dark": "#001F3F", // Deep Air Force blue
        "naf-blue": "#3A7CA5", // Light Air Force blue
        "naf-gold": "#E6C76E", // Muted refined gold
        "naf-light": "#EAEFF6", // Muted refined gold
      },
    },
  },
  plugins: [],
};
