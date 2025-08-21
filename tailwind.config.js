/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        underline: {
          '0%': { width: '0' },
          '100%': { width: '8rem' }, // adjust to match your desired width
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'underline': 'underline 1s ease-out forwards',
      },
    },
  },
}

