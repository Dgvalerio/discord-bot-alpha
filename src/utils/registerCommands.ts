import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { clientId, guildId, token } from '../configs/config.json';
import { MountCommand } from './mountCommand';

export const registerCommands = async (commands: MountCommand.Model[]) => {
  console.log('Registrando comandos...');

  const rest = new REST({ version: '9' }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map(({ data }) => {
        console.log(`"${data.name}: ${data.description}"...`);
        return data.toJSON();
      }),
    })
    .then(() => console.log('Comandos registrados com sucesso!'))
    .catch(console.error);
};
