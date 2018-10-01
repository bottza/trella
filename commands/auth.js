const { Command } = require('yamdbf');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('storage/authorized_users.json');
const db = low(adapter);

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'auth',
			desc: 'Authorizes your account with Trello',
			usage: '<prefix>auth [token]'
		});
	}

	action(message, [token])
	{
    if (typeof token == 'undefined') {
      message.reply('Click here to get started! https://bit.ly/trellauth');
    } else {
      message.reply('In progress...');
    }
	}
}
