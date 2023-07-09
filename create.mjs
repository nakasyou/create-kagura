import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'fs-extra'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

async function main () {
  console.log(chalk.blue('Create Kagura'))

  let targetDir = ''
  const questions = [
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name',
      onState: (state) => {
        targetDir = state.value
      }
    },
    {
      type: () => !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
      name: 'overwrite',
      message: () => `${targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
      onState: (state) => {
        if (!state.value) {
          cansel() // Throw error
        }
      }
    },
  ]
  const result = await prompts(questions)
  
  if (result.overwrite) {
    // Empty dir
    await fs.remove(targetDir)
  }
  
  const pkgManager = getPkgManager()
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../templates',
    'typescript'
  )
  const files = fs.readdirSync(templateDir)
  for (const file of files) {
    if (file === "_gitignore") {
      await fs.copy(path.resolve(templateDir, '.gitignore'), path.resolve(targetDir, file))
      continue
    }
    if (file === 'package.json') {
      const packageJson = await fs.readJson(path.resolve(templateDir, 'package.json'))
      packageJson.name = targetDir
      await fs.writeJson(path.resolve(targetDir, file), packageJson, {
        spaces: 2,
      })
      continue
    }
    await fs.copy(path.resolve(templateDir, file), path.resolve(targetDir, file))
  }
  
  console.log('Inited KaguraJS!')
  console.log('\nNext steps :')
  console.log(`cd ${targetDir}`)
  console.log(`${pkgManager} i`)
  if (['yarn', 'pnpm'].includes(pkgManager)) {
    console.log(`${pkgManager} dev`)
  } else {
    console.log(`${pkgManager} run dev`)
  }
}

// Utils
function cansel () {
  console.log('\n')
  console.log(chalk.red('✖') + ' Operation cancelled')
  process.exit(1)
}
function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}
function getPkgManager() {
  const npmUa = process.env.npm_config_user_agent ? process.env.npm_config_user_agent : ""  // get npm_config_user_agent

  const pkgSpec = npmUa.split(' ')[0]
  const pkgManager = pkgSpec.split('/')[0]

  return pkgManager ? pkgManager : 'npm'
}

main()
