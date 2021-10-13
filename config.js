const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red
} = require('kolorist')

module.exports = [
  {
    name: 'lint',
    color: green,
    variants: [
      {
        name: 'lint',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'lint-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'vue',
    color: green,
    variants: [
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'react',
    color: cyan,
    variants: [
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
]
