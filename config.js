const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red
} = require('kolorist')

const AppList = [
  {
    name: 'vanilla',
    color: yellow,
    type: 'app',
    variants: [
      {
        name: 'vanilla',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'vanilla-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'vue',
    color: green,
    type: 'app',
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
    type: 'app',
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
  {
    name: 'preact',
    color: magenta,
    type: 'app',
    variants: [
      {
        name: 'preact',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'preact-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'lit',
    color: lightRed,
    type: 'app',
    variants: [
      {
        name: 'lit',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'lit-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  },
  {
    name: 'svelte',
    color: red,
    type: 'app',
    variants: [
      {
        name: 'svelte',
        display: 'JavaScript',
        color: yellow
      },
      {
        name: 'svelte-ts',
        display: 'TypeScript',
        color: blue
      }
    ]
  }
];

const BlockList = [
  {
    name: 'lint',
    color: green,
    type: 'block',
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
];

module.exports = [
  {
    name: 'app',
    color: green,
    list: AppList,
  },
  {
    name: 'block',
    color: yellow,
    list: BlockList,
  },
  // {
  //   name: 'code',
  //   color: cyan,
  //   list: CodeList,
  // },
  // {
  //   name: 'plugin',
  //   color: blue,
  //   list: PluginList,
  // },
];

