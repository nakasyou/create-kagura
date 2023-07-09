import chalk from 'chalk'
import prompts from 'prompts'

async function main () {
  console.log(chalk.blue('Create Kagura'))

  const questions = [
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name'
    }
  ]
  const result = await prompts(questions)
  console.log(result)

  const pkgManager = getPkgManager()
  
  console.log('Inited KaguraJS!')
  console.log('\nNext steps :')
  console.log(`cd ${'dir'}`)
  console.log(`${pkgManager} i`)
  if (['yarn', 'pnpm'].includes(pkgManager)) {
    console.log(`${pkgManager} dev`)
  } else {
    console.log(`${pkgManager} run dev`)
  }
}
function getPkgManager() {
  const npmUa = process.env.npm_config_user_agent ? process.env.npm_config_user_agent : ""  // get npm_config_user_agent

  const pkgSpec = npmUa.split(' ')[0]
  const pkgManager = pkgSpec.split('/')[0]

  return pkgManager ? pkgManager : 'npm'
}

main()
