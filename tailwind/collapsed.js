const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addUtilities, variants }) => {
  const pluginVariants = variants('toggle', [])

  const toggle = {
    '[data-slide-target="receiver"]': {
      opacity: 1,
      transitionProperty: 'opacity, visibility, max-height',
      visibility: 'visible',
    },

    '.collapsed': {
      'max-height': '0 !important',
      opacity: 0,
      overflow: 'hidden',
      visibility: 'hidden',
    },
  }

  addUtilities(toggle, pluginVariants)
})
