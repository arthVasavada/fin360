const plugin = require('tailwind-scrollbar');

module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend scrollbar styles for Tailwind
      scrollbar: {
        thin: {
          width: '5px',
          height: '5px',
          thumb: {
            background: '#999',
            borderRadius: '10px',
          },
          track: {
            background: 'transparent',
          },
        },
        thumbHover: {
          background: '#777',
        },
      },
    },
  },
  plugins: [plugin], // Add the plugin
  variants: {
    scrollbar: ['rounded'], // Enable rounded scrollbar variants
  },
};
