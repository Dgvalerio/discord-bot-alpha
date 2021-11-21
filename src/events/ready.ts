import { Client } from 'discord.js';

export const ready = (client: Client) =>
  client.once('ready', () => {
    console.log(`Bot ${client.user?.tag} iniciado com sucesso!`);
    console.log('Esperando por comandos...');
  });
