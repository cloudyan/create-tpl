#!/usr/bin/env node

// @ts-check
const fs = require('fs')
const path = require('path')
// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })
// eslint-disable-next-line node/no-restricted-require
const prompts = require('prompts')
const {
  yellow,
  green,
  cyan,
  blue,
  magenta,
  lightRed,
  red
} = require('kolorist')

const tpls = require('./config');

const cwd = process.cwd()

// tpl
// tpl -> framework -> variant
// 1 App Frameworks
// 2 Block
// 3 Code
// 4 Plugin

let TYPES = tpls.map(t => {
  return [t.name];
}).reduce((a, b) => a.concat(b), []);

const TEMPLATES = tpls.map(
  (f) => (f.list && f.list.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), []);
let FRAMEWORKS = [];


const renameFiles = {
  _gitignore: '.gitignore'
}

// 分步骤
// 1. Project name:
// 2. overwrite Checker
// 3. Select the boilerplate type:
// 4. Select a framework:
// 5. Select a variant:
async function init() {
  let targetDir = argv._[0]
  let template = argv.template || argv.t
  // Select the boilerplate type
  let boilerplateType = argv.boilerplate || argv.b

  if (!template && boilerplateType && TYPES.includes(boilerplateType)) {
    FRAMEWORKS = toValidBoilerplate(boilerplateType).list;
  }

  const defaultProjectName = targetDir || 'temp'

  let result = {}

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) =>
            (targetDir = state.value.trim() || defaultProjectName)
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              if (!['.', './'].includes(targetDir)) {
                throw new Error(red('✖') + ' Operation cancelled')
              }
              return null
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        // Select the boilerplate type
        {
          type: (_) => {
            // console.log('boilerplateType', boilerplateType);
            if (template && TEMPLATES.includes(template)) return null;
            return boilerplateType && TYPES.includes(boilerplateType) ? null : 'select'
          },
          name: 'boilerplate',
          message:
            typeof boilerplateType === 'string' && !TYPES.includes(boilerplateType)
              ? `"${boilerplateType}" isn't a valid boilerplate type. Please choose from below: `
              : 'Select the boilerplate type:',
          initial: () => toValidBoilerplate(boilerplateType),
          // initial: 0,
          choices: tpls.map((boilerplate) => {
            const boilerplateColor = boilerplate.color;
            return {
              title: boilerplateColor(boilerplate.name),
              value: boilerplate
            }
          }),
        },
        {
          // type: template && TEMPLATES.includes(template) ? null : 'select',
          type: (_, { boilerplate }) => {
            // console.log('boilerplate', _, boilerplate);
            if (template && TEMPLATES.includes(template)) return null;
            return 'select'; // boilerplate && boilerplate.list ? 'select' : null;
          },
          name: 'framework',
          message:
            typeof template === 'string' && !TEMPLATES.includes(template)
              ? `"${template}" isn't a valid template. Please choose from below: `
              : 'Select a framework:',
          initial: 0,
          choices: (boilerplate) => {
            return (boilerplate?.list || FRAMEWORKS).map((framework) => {
              const frameworkColor = framework.color
              return {
                title: frameworkColor(framework.name),
                value: framework
              }
            })
          },
        },
        {
          type: (framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: 'Select a variant:',
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.name),
                value: variant.name
              }
            })
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { boilerplate, framework, overwrite, packageName, variant } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  // determine template
  template = variant || framework || template

  // console.log('result', boilerplateType, template, result);
  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.join(__dirname, `tpls/template-${template}`)

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  // 覆写 package.json 做存在性检测
  const pkgTpl = path.join(templateDir, `package.json`);
  if (fs.existsSync(pkgTpl)) {
    const pkg = require(path.join(templateDir, `package.json`))

    pkg.name = packageName || targetDir

    write('package.json', JSON.stringify(pkg, null, 2))
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

// './' 为 false, '-' 为 true
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidBoilerplate(type) {
  const boilerplate = tpls.find(item => item.name === type) || 0;
  // console.log('toValidBoilerplate', type, boilerplate);
  return boilerplate;
}

// './' 转为 '-'
function toValidPackageName(projectName) {
  if (projectName === '.') return '-'; // FIXED: 支持在当前目录生成项目
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

init().catch((e) => {
  console.error(e)
})
