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
  
}
main()
