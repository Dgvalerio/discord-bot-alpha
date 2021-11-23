import { Client, Interaction } from 'discord.js';

import { MountCommand } from '../utils';

export const interactionCreate = (
  client: Client,
  commands: { [key: string]: MountCommand.Model }
) =>
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    await commands[interaction.commandName].action(interaction);
  });
