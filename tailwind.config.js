/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["MyFont", "sans-serif"],
      },
    },
  },
plugins: [
  require('@tailwindcss/line-clamp'),
],
};
