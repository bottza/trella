# Trella

[![Discord](https://img.shields.io/discord/490867255144611850.svg?style=flat-square)](https://discord.io/bottza)
[![Travis CI](https://img.shields.io/travis/com/bottza/trella/master.svg?style=flat-square)](https://travis-ci.com/bottza/trella)
[![Depfu](https://img.shields.io/depfu/bottza/trella.svg?style=flat-square)](https://depfu.com/repos/bottza/trella)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)

A flexible moderation bot for server admins who want free time.

## Installation

```
$ git clone https://github.com/bottza/trella.git
$ cd trella
$ npm install
```
Next, go [here](https://discordapp.com/developers/applications/) and create a Discord application and make it a bot, if you haven't already. Copy the bot's token. Now run:
```
$ npm run setup
```
Enter your token and then copy your user ID in Discord by enabling developer mode, right clicking on your profile, and clicking `Copy ID`. Enter that in too. That's it!

## Running

```
$ npm start
```

## Development

```
$ npm run watch
```

## Testing and Linting


```
$ npm test

$ npm run lint
$ npm run fix
```
