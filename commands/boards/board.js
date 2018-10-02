const {Command} = require('discord.js-commando');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('storage/bot.json');
const db = low(adapter);

const trelloYello = require('trello-yello');
const key = require('../../key');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'board',
      group: 'boards',
      memberName: 'board',
      description: 'Selects a Trello board',
      examples: ['board <id>'],
      args: [
        {
          key: 'id',
          prompt: 'What is the id of the board?',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  async run(message, {id}) {
    const prefix = message.guild === null ? this.client.commandPrefix : message.guild.commandPrefix;
    if (!db.get('users').find({id: message.author.id}).value()) {
      return message.reply('You\'re not signed in! Please run `' + prefix + 'auth`.');
    }
    const {token} = db.get('users').find({id: message.author.id}).value();
    const trello = trelloYello({key, token});
  }
};
