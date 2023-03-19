const {
  yellow,
  reset,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red
} = require('kolorist')

type ColorFunc = (str: string | number) => string
export type Template = {
  type: string
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

export const TemplateList: Template[] = [
  {
    type: 'app',
    name: 'vue',
    display: 'vue',
    color: green,
  },
  {
    type: 'app',
    name: 'vue-ts',
    display: 'Vue-ts',
    color: blue,
  },
  {
    type: 'block',
    name: 'lint',
    display: 'Lint',
    color: yellow,
  },
  {
    name: 'lock',
    display: 'Lock',
    color: green,
    type: 'block',
  },
  {
    name: 'sca',
    display: 'Sca',
    color: blue,
    type: 'block',
  },
  {
    type: 'other',
    name: 'others',
    display: 'Others',
    color: reset,
    customCommand: 'npm create vite-extra@latest TARGET_DIR',
  },
];


