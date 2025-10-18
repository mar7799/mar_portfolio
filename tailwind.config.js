/** @type {import('tailwindcss').Config} */
export default {
  // Use class-based dark mode so toggling the 'dark' class on <html> works
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
