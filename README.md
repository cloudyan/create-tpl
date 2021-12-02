# create-tpl

fork from [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

- [x] 支持更多的模板分类 app block
- [x] 支持当前文件夹生成 tpl 文件(命名覆盖, 非同名附加)
- [ ] 支持使用 npm@version 包内容作为模板(有版本的概念)
- [ ] 支持类似 nrm 配置别名，方便复用指定模板
- [ ] 支持 package.json merge 形式混入配置(可选是否混入)
- [ ] 支持简单模版变量替换 比如新增页面或 model

## Scaffolding Your First Vite Project

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org/en/) version >=12.0.0.

With NPM:

```bash
$ npm init vite@latest
```

With Yarn:

```bash
$ yarn create vite
```

With PNPM:

```bash
$ pnpm create vite
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:

```bash
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

Currently supported template presets include:

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`
- `lit`
- `lit-ts`
- `svelte`
- `svelte-ts`

## Community Templates

create-vite is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for [community maintained templates](https://github.com/vitejs/awesome-vite#templates) that include other tools or target different frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your project with one of the templates.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

If the project uses `main` as the default branch, suffix the project repo with `#main`

```bash
npx degit user/project#main my-project
```
