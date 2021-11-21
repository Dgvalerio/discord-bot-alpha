import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { clientId, guildId, token } from '../config.json';

const commands: SlashCommandBuilder[] = [];

const addCommand = (name: string, description: string) =>
  commands.push(
    new SlashCommandBuilder().setName(name).setDescription(description)
  );

addCommand('ping', 'Replies with pong!');
addCommand('server', 'Replies with server info!');
addCommand('user', 'Replies with user info!');

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands.map((command) => command.toJSON()),
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
