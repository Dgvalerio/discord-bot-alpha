import { MessageEmbed } from 'discord.js';

import { FirebaseController } from '../firebase/controller';
import { mountCommand } from '../utils';

export default mountCommand({
  name: 'start',
  description: 'Iniciar tarefa',
  action: async (interaction) => {
    const firebase = new FirebaseController();

    const response = await firebase.openAppointment({
      start: new Date(),
      user: interaction.user.id,
    });

    const { username, url } = {
      username: interaction.user.username,
      url: interaction.user.avatarURL() || '',
    };

    const exampleEmbed = new MessageEmbed()
      .setAuthor(username, url, url)
      .setThumbnail(url)
      .addField('\u200B', '\u200B', false)
      .setTimestamp();

    if (response.success) {
      await interaction.reply(`Iniciando apontamento para ${username}...`);

      interaction.channel?.send({
        embeds: [
          exampleEmbed
            .setTitle('Apontamento iniciado com sucesso!')
            .setColor('#00c853'),
        ],
      });
    } else if (response.failure) {
      await interaction.reply('Já existe um apontamento aberto!');

      interaction.channel?.send({
        embeds: [
          exampleEmbed
            .setTitle('Um apontamento já foi iniciado!')
            .setColor('#d50000')
            .setDescription(response.failure.messages.join('\n')),
        ],
      });
    }
  },
});
