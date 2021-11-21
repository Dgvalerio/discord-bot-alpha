// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';

import { token } from '../config.json';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case 'ping':
      await interaction.reply('Pong!');
      break;
    case 'server':
      await interaction.reply(
        `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
      );
      break;
    case 'user':
      await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
      );
      break;
  }
});

// Login to Discord with your client's token
client.login(token);
