import {
  CollectorFilter,
  Message,
  MessageCollector,
  MessageEmbed,
  TextBasedChannels,
} from 'discord.js';

import { FirebaseController } from '../firebase/controller';
import { mountCommand } from '../utils';

export default mountCommand({
  name: 'close',
  description: 'Finalizar tarefa',
  action: async (interaction) => {
    const filter: CollectorFilter<[Message]> = ({ author: { id } }) =>
      id === interaction.user.id;

    const collector = new MessageCollector(
      <TextBasedChannels>interaction.channel,
      { filter, max: 1, time: 1000 * 60 }
    );

    interaction.channel?.send('Qual a descrição do apontamento?');

    collector.on('end', async (collected) => {
      const item = collected.first();

      if (!item) return;

      const firebase = new FirebaseController();

      const response = await firebase.closeAppointment({
        user: item.author.id,
        message: item.content,
      });

      const { username, url } = {
        username: item.author.username,
        url: item.author.avatarURL() || '',
      };

      const exampleEmbed = new MessageEmbed()
        .setAuthor(username, url, url)
        .setThumbnail(url)
        .addField('\u200B', '\u200B', false)
        .setTimestamp();

      if (response.success) {
        interaction.channel?.send({
          embeds: [
            exampleEmbed
              .setTitle('Apontamento finalizado!')
              .setColor('#00c853')
              .setDescription(item.content),
          ],
        });
      } else if (response.failure) {
        interaction.channel?.send({
          embeds: [
            exampleEmbed
              .setTitle('Sem apontamentos para finalizar!')
              .setColor('#d50000')
              .setDescription(response.failure.messages.join('\n')),
          ],
        });
      }
    });

    await interaction.reply(
      `Finalizando apontamentos para ${interaction.user.username}...`
    );
  },
});
