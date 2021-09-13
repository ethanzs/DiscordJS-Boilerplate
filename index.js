/*  
    +-------------------------------------------------------+
    |               Discord.js Boilerplate                  |
    |                  Author: EthanZS                      |
    |                   Version: DEV                        |
    +-------------------------------------------------------+
*/

'use strict';

/* 
      +--------------------------------------------------+
      |                    Imports                       |
      +--------------------------------------------------+
*/
const Discord = require('discord.js');
const fs = require('fs');
const config = require("./config.json");


/* 
      +--------------------------------------------------+
      |           Initiate Discord Client (Bot)          |
      +--------------------------------------------------+
*/
const client = new Discord.Client(
  {
    ws: { intents: Discord.Intents.ALL },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  });


/* 
      +--------------------------------------------------+
      |        Init commands from commands folder        |
      +--------------------------------------------------+
*/
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


/* 
      +--------------------------------------------------+
      |              On bot online event                 |
      +--------------------------------------------------+
*/
client.on('ready', () => {
  console.log('[SERVER]: Online');
});


/* 
      +--------------------------------------------------+
      |                On message event                  |
      +--------------------------------------------------+
*/
client.on('message', async message => {

  /* Prefix Command Handler */
  if (message.content.startsWith(config.prefix) && !message.author.bot) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return

    try {
      client.commands.get(command).execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }

});


/* 
      +--------------------------------------------------+
      |                Helper Functions                  |
      +--------------------------------------------------+
*/


/* 
      +--------------------------------------------------+
      |               On reaction event                  |
      +--------------------------------------------------+
*/
client.on('messageReactionAdd', async (reaction_orig, user) => {
});


/* 
      +--------------------------------------------------+
      |              On member join event                |
      +--------------------------------------------------+
*/
client.on('guildMemberAdd', member => {
});


/* 
      +--------------------------------------------------+
      |              On voice update event               |
      +--------------------------------------------------+
*/
client.on('voiceStateUpdate', (oldState, newState) => {
});


/* 
      +--------------------------------------------------+
      |                 Bot Token Login                  |
      +--------------------------------------------------+
*/
client.login(config.token);
