const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addVariant, e }) => {
  addVariant('aria-selected', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `[aria-selected='true'] .${e(
        `aria-selected${separator}${className}`
      )}, [aria-selected='true'].${e(`aria-selected${separator}${className}`)}`
    })
  })
})
