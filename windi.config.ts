import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      'pages/**/*.{vue,ts}',
      'components/**/*.{vue,ts}',
      'layouts/**/*.{vue,ts}',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
})
