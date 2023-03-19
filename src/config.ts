import {
  yellow,
  reset,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red
} from 'kolorist'

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
    type: 'project',
    name: 'project-vue',
    display: 'vue',
    color: green,
  },
  {
    type: 'project',
    name: 'project-vue-ts',
    display: 'Vue-ts',
    color: blue,
  },
  {
    type: 'block',
    name: 'config-lint',
    display: 'Lint',
    color: yellow,
  },
  {
    type: 'block',
    name: 'config-lock',
    display: 'Lock',
    color: green,
  },
  {
    name: 'md-source-code-analysis',
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


