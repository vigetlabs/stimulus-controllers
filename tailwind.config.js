const { em } = require('@viget/tailwindcss-plugins/utilities/fns')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,astro}'],
  plugins: [
    require('./tailwind/aria-selected'),
    require('./tailwind/collapsed'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      screens: {
        smd: { max: em(640) },
        mdd: { max: em(768) },
        lgd: { max: em(1024) },
        xld: { max: em(1280) },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: 'auto',
              color: theme('colors.slate.200'),
              '[class~="lead"]': {
                color: theme('colors.slate.600'),
              },
              a: {
                color: theme('colors.indigo.400'),
              },
              strong: {
                color: theme('colors.slate.300'),
              },
              'ol > li::before': {
                color: theme('colors.slate.500'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.slate.300'),
              },
              hr: {
                borderColor: theme('colors.slate.700'),
              },
              blockquote: {
                color: theme('colors.slate.300'),
                borderLeftColor: theme('colors.slate.200'),
              },
              h1: {
                color: theme('colors.slate.200'),
              },
              h2: {
                borderBottom: 2,
                borderBottomColor: theme('colors.slate.500'),
                borderStyle: 'solid',
                color: theme('colors.indigo.400'),
                paddingBottom: 8,
              },
              h3: {
                color: theme('colors.slate.200'),
              },
              h4: {
                color: theme('colors.slate.200'),
              },
              'figure figcaption': {
                color: theme('colors.slate.500'),
              },
              code: {
                color: theme('colors.slate.300'),
                backgroundColor: theme('colors.slate.800'),
                padding: 2,
                borderRadius: 4,
              },
              'a code': {
                color: theme('colors.slate.300'),
              },
              pre: {
                color: theme('colors.slate.200'),
                backgroundColor: theme('colors.slate.800'),
                border: 2,
                borderColor: theme('colors.slate.700'),
                borderStyle: 'solid',
              },
              table: {
                backgroundColor: theme('colors.slate.800'),
                borderRadius: 4,
              },
              'table code, p code': {
                backgroundColor: theme('colors.slate.600'),
              },
              thead: {
                color: theme('colors.slate.200'),
                borderBottomColor: theme('colors.slate.700'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.slate.700'),
              },
              'th, td': {
                padding: 8,
              },
            },
          ],
        },
      }),
    },
  },
}
