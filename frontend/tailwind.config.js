/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.12)"
      },
      colors: {
        bg: {
          DEFAULT: "#0b1020",
          soft: "#111827"
        }
      }
    }
  },
  plugins: []
};
