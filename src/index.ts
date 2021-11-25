import { Client, Intents } from 'discord.js';

import { token } from '../config.json';
import { start, close } from './commands';
import { interactionCreate, ready } from './events';
import { MountCommand, registerCommands } from './utils';

(async () => {
  console.log('Iniciando bot...');

  const commands: { [key: string]: MountCommand.Model } = { start, close };

  await registerCommands(Object.entries(commands).map(([, model]) => model));

  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });

  ready(client);

  interactionCreate(client, commands);

  await client.login(token);
})();
