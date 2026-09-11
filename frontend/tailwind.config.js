/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editorial-crimson': '#9B0F1A',
        'editorial-accent': '#BA1325',
        'editorial-maroon': '#5A060E',
        'editorial-canvas': '#F9F8F6',
        'editorial-base': '#FAF9F6',
        'editorial-noir': '#111111',
        'editorial-dark': '#1A1A1A',
        'editorial-muted': '#666666',
        'editorial-gray': '#7E7E7E',
        'editorial-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Alex Brush"', '"Playfair Italic"', 'cursive'],
      },
      letterSpacing: {
        widest: '.25em',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
