/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        falconred: {
          100: '#E74C3C',
          80: '#EB6D60',
          60: '#F08C82',
          DEFAULT: '#E74C3C',
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
