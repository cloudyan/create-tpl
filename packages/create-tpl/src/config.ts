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
    name: 'project-vue',
    display: 'vue',
    type: 'project',
    color: green,
  },
  {
    name: 'project-vue-ts',
    display: 'vue-ts',
    type: 'project',
    color: blue,
  },
  {
    name: 'lint',
    display: 'config-lint',
    type: 'block',
    color: yellow,
  },
  {
    type: 'block',
    name: 'deps-lock',
    display: 'deps-lock',
    color: green,
  },
  {
    name: 'md-sca',
    display: 'md-source-code-analysis',
    color: yellow,
    type: 'block',
  },
  {
    name: 'lerna-pnpm',
    display: 'monorepo-by-lerna-pnpm',
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


