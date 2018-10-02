const {Command} = require('yamdbf');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('storage/authorized_users.json');
const db = low(adapter).get('users');

module.exports = class extends Command {
  constructor() {
    super({
      name: 'auth',
      desc: 'Authorizes your account with Trello',
      usage: '<prefix>auth [token]'
    });
  }

  async action(message, [token]) {
    if (typeof token === 'undefined') {
      return message.reply('Click here to get started! https://bit.ly/trellauth');
    }
    if (db.find({ id: message.author.id }).value()) {
      db.find({ id: message.author.id }).update('token', token).write();
    } else {
      db.push({
        id: message.author.id,
        token
      }).write();
    }
    const prefix = await this.client.getPrefix(message.guild);
    return message.reply('Done! Run `' + prefix + 'help` to see the available commands.');
  }
};
