import { Client, Intents, Interaction } from 'discord.js';

import { ping, user, server } from './commands';
import { token } from './configs/config.json';
import { MountCommand, registerCommands } from './utils';

(async () => {
  const commands: { [key: string]: MountCommand.Model } = {
    ping,
    server,
    user,
  };

  await registerCommands(Object.entries(commands).map((value) => value[1]));

  console.log('Iniciando bot...');

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.once('ready', () => {
    console.log(`Bot ${client.user?.tag} iniciado com sucesso!`);
    console.log('Esperando por comandos...');
  });

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    await commands[interaction.commandName].action(interaction);
  });

  await client.login(token);
})();
