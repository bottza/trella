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
      name: 'boards',
      group: 'boards',
      memberName: 'boards',
      description: 'Lists available boards',
      examples: ['boards']
    });
  }

  async run(message) {
    const prefix = message.guild === null ? this.client.commandPrefix : message.guild.commandPrefix;
    if (!db.get('users').find({id: message.author.id}).value()) {
      return message.say('You\'re not signed in! Please run `' + prefix + 'auth`.');
    }
    const {token} = db.get('users').find({id: message.author.id}).value();
    const trello = trelloYello({key, token});

    const boards = await trello.getCurrentUser().getBoards();

    let toSend = 'Run `' + prefix + 'board <id>` to choose a board.\n\nBoards:';
    let name;
    let id;
    for (const board of boards) {
      name = await board.getName(); // eslint-disable-line no-await-in-loop
      id = await board.getId(); // eslint-disable-line no-await-in-loop
      toSend += '\n - `' + id + '` ' + name;
    }
    return message.say(toSend);
  }
};
