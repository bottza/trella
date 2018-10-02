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
      name: 'board',
      desc: 'Select a Trello board',
      usage: '<prefix>board <id>'
    });
  }

  async action(message, id) {
    const prefix = await this.client.getPrefix(message.guild);
    if (!db.find({ id: message.author.id }).value()) {
      return message.reply('You\'re not signed in! Please run `' + prefix + 'auth`.');
    }
    const token = db.find({ id: message.author.id }).value().token;
    const trello = Trello({ key: key, token: token });


  }
};
