/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        falconred: {
          100: '#E74C3C',
          80: '#EB6D60',
          60: '#F08C82',
          DEFAULT: '#E74C3C',
        },
        falcongray: {
          100: '#1f1f1f',
          DEFAULT: '#242424',
        },
      },
      boxShadow: {
        'hero-image': '0px 0px 25px 4px #E74C3C',
        'hero-image-hover': '0px 0px 30px 8px #E74C3C',
      },
    },
  },
  plugins: [],
}
