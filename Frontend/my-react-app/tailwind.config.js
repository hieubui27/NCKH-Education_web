/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ánh xạ các biến CSS từ file CSS của bạn
        green: {
          primary: 'var(--green-primary)',
          secondary: 'var(--green-secondary)',
        },
        red: {
          primary: 'var(--red-primary)',
        },
        white: {
          primary: 'var(--white-primary)',
          secondary: 'var(--white-secondary)',
        },
        black: 'var(--black)',
      },
    },
  },
  plugins: [],
}