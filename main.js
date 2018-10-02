const path = require('path');
const chalk = require('chalk');
const {CommandoClient} = require('discord.js-commando');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('storage/bot.json');
const db = low(adapter);

const config = require('./config');

const client = new CommandoClient({
  commandPrefix: '?',
  owner: config.owner,
  disableEveryone: false
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['boards', 'Boards'],
    ['lists', 'Lists'],
    ['cards', 'Cards'],
    ['other', 'Other'],
    ['utility', 'Utility']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(chalk.green('The bot is ready!'));
  client.user.setActivity('for ' + client.commandPrefix + 'help', {type: 'WATCHING'});
});

db.defaults({users: [], selectedBoards: []}).write();
client.login(config.token);
