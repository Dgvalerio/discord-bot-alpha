import {
  CollectorFilter,
  Message,
  MessageCollector,
  MessageEmbed,
} from 'discord.js';

import { mountCommand } from '../utils';

export default mountCommand({
  name: 'res',
  description: 'Return entered text!',
  action: async (interaction) => {
    const filter: CollectorFilter<[Message]> = ({ author: { id } }) =>
      id === interaction.user.id;

    if (!interaction.channel) return;

    const collector = new MessageCollector(interaction.channel, {
      filter,
      max: 1,
      time: 7000,
    });

    if (!interaction.channel) return;

    interaction.channel.send('Qual seu nome?');

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} messages`);

      collected.forEach((value) => console.log(value.content));

      const item = collected.first();

      if (!item) return;

      const url = item.author.avatarURL();

      const exampleEmbed = url
        ? new MessageEmbed()
            .setColor('#304ffe')
            .setTitle('Novo apontamento')
            .setAuthor(item.author.username, url, url)
            .setThumbnail(url)
            .addField('Mensagem', item.content, false)
            .addField('\u200B', '\u200B', false)
            .setTimestamp()
        : new MessageEmbed()
            .setColor('#304ffe')
            .setTitle('Novo apontamento')
            .setAuthor(item.author.username)
            .addField('Mensagem', item.content, false)
            .addField('\u200B', '\u200B', false)
            .setTimestamp();

      interaction.channel?.send({ embeds: [exampleEmbed] });
    });

    await interaction.reply(`Your tag: ${interaction.user.tag}`);
  },
});
