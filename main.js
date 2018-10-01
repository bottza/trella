const {Client} = require('yamdbf');
const config = require('./config');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const authorizedUsers = new FileSync('storage/authorized_users.json');
const authorizedUsersDb = low(authorizedUsers);

const client = new Client({
  name: 'Trella',
  commandsDir: './commands',
	readyText: 'Client is ready!',
  token: config.token,
  owner: config.owner,
  pause: true
}).start();

client.on('pause', async () => {
  await client.setDefaultSetting('prefix', '?');
  authorizedUsersDb.defaults({ users: [] }).write();
  client.emit('continue');
});
