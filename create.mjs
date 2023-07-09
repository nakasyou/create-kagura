import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'node:fs'

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
  console.log(result)

  const pkgManager = getPkgManager()
  
  console.log('Inited KaguraJS!')
  console.log('\nNext steps :')
  console.log(`cd ${result.projectName}`)
  console.log(`${pkgManager} i`)
  if (['yarn', 'pnpm'].includes(pkgManager)) {
    console.log(`${pkgManager} dev`)
  } else {
    console.log(`${pkgManager} run dev`)
  }
}
function cansel () {
  throw new Error("Canseled")
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
