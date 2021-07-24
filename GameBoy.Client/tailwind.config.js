const colors = require('tailwindcss/colors')

delete colors.lightBlue // Replaced by sky

module.exports = {
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled']
    }
  },

  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
    }
  }
}