const {Command} = require('yamdbf');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('storage/authorized_users.json');
const db = low(adapter).get('users');

const Trello = require('trello-yello');
const key = require('../key');

module.exports = class extends Command {
  constructor() {
    super({
      name: 'boards',
      desc: 'Lists available trello boards',
      usage: '<prefix>boards'
    });
  }

  async action(message) {
    const prefix = await this.client.getPrefix(message.guild);
    if (!db.find({ id: message.author.id }).value()) {
      return message.reply('You\'re not signed in! Please run `' + prefix + 'auth`.');
    }
    const token = db.find({ id: message.author.id }).value().token;
    const trello = Trello({ key: key, token: token });

    const boards = await trello.getCurrentUser().getBoards();

    let toSend = "Run `" + prefix + "board <id>` to choose a board.\n\nBoards:";
    let name;
    let id;
    for (let board of boards) {
      name = await board.getName();
      id = await board.getId();
      toSend += "\n - `" + id+ "` " + name;
    }
    return message.channel.send(toSend);
  }
};
