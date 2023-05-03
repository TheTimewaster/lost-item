/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'tree-shade': '#1C2B01',
        'red': {
          DEFAULT: '#f04237',
          light: '#ff7762',
          dark: '#b6000e',
        },
        'green': {
          DEFAULT: '#21B563',
          light: '#62e892',
          dark: '#008437',
        },
        'sky': {
          DEFAULT: '#0E99E2',
          50: '#AEE0FA',
          100: '#9AD8F9',
          200: '#74C9F6',
          300: '#4EBBF4',
          400: '#27ACF2',
          500: '#0E99E2',
          600: '#0B75AD',
          700: '#075178',
          800: '#042E44',
          900: '#010A0F',
        },
        'lemon': {
          DEFAULT: '#F7D933',
          50: '#FEFAE4',
          100: '#FDF6D0',
          200: '#FCEFA9',
          300: '#FAE882',
          400: '#F9E05A',
          500: '#F7D933',
          600: '#E9C709',
          700: '#B39807',
          800: '#7D6A05',
          900: '#473C03',
        },
        'dark': {
          DEFAULT: '#222222',
          50: '#4a4a4a',
          100: '#3c3c3c',
        },
      },
    },
  },
  plugins: [],
};
