const fs = require('fs');
const prompts = require('prompts');
const chalk = require('chalk');

(async () => {
  const questions = [
    {
      type: 'text',
      name: 'token',
      message: 'Your bot token',
      validate: value => value ? true : 'Please enter a bot token!'
    },
    {
      type: 'number',
      name: 'owner',
      message: 'Your user id',
      validate: value => value ? true : 'Please enter a user id!'
    }
  ];
  const responses = await prompts(questions);
  if (!responses.token || !responses.owner) {
    console.log(chalk.red('Please enter values!'));
  } else {
    const string = 'module.exports.token = "' +
               responses.token + '";\n' +
               'module.exports.owner = "' +
               responses.owner + '";';
    fs.writeFile('config.js', string, error => {
      if (error) {
        console.log(chalk.red('Error in saving config!'));
        console.log(chalk.red(error.message));
      } else {
        console.log(chalk.green('Done saving config!'));
      }
    });
  }
})();
