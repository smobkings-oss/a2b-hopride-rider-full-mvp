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
        gold: {
          400: '#F4C430',
          500: '#D4AF37',
          600: '#B8860B',
        },
        holographic: {
          from: '#8B5CF6',
          via: '#EC4899',
          to: '#F59E0B',
        },
      },
      backgroundImage: {
        'holographic': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F4C430 0%, #D4AF37 50%, #B8860B 100%)',
      },
    },
  },
  plugins: [],
};
