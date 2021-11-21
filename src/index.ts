import { Client, Intents } from 'discord.js';

import { token } from '../config.json';
import { ping, user, server } from './commands';
import { interactionCreate, ready } from './events';
import { MountCommand, registerCommands } from './utils';

(async () => {
  console.log('Iniciando bot...');

  const commands: { [key: string]: MountCommand.Model } = {
    ping,
    server,
    user,
  };

  await registerCommands(Object.entries(commands).map(([, model]) => model));

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  ready(client);

  interactionCreate(client, commands);

  await client.login(token);
})();
