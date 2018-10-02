const {Command} = require('discord.js-commando');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('storage/bot.json');
const db = low(adapter);

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'auth',
      group: 'other',
      memberName: 'auth',
      description: 'Authorizes your account with Trello',
      examples: ['auth', 'auth [token]'],
      args: [
        {
          key: 'token',
          prompt: 'What is your token?',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  run(message, {token}) {
    const prefix = message.guild === null ? this.client.commandPrefix : message.guild.commandPrefix;
    if (!token) {
      return message.say('Click here to get started! https://bit.ly/trellauth');
    }
    message.delete();
    if (db.get('users').find({id: message.author.id}).value()) {
      db.get('users').find({id: message.author.id}).update('token', token).write();
    } else {
      db.get('users').push({
        id: message.author.id,
        token
      }).write();
    }
    message.say('Done! Run `' + prefix + 'help` to see the available commands.');
    return message.say('Also, your message was deleted to hide your token.');
  }
};
