import { CollectorFilter, Message, MessageCollector } from 'discord.js';

import { mountCommand } from '../utils';

export default mountCommand({
  name: 'col',
  description: 'Try use collector!',
  action: async (interaction) => {
    const questions = [
      'Qual o cliente?',
      'Qual o projeto?',
      'Qual a categoria?',
      'Qual a data?',
    ];
    let counter = 0;

    const filter: CollectorFilter<[Message]> = (m) =>
      m.author.id === interaction.user.id;

    if (!interaction.channel) return;

    const collector = new MessageCollector(interaction.channel, {
      filter,
      max: questions.length,
      time: 60000,
    });

    interaction.channel.send(questions[counter++]);
    collector.on('collect', (m) => {
      if (counter < questions.length) m.channel.send(questions[counter++]);
    });

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} messages`);

      if (collected.size < questions.length) {
        interaction.reply('You did not answer the questions in time');
        return;
      }

      let counter = 0;
      collected.forEach((value) => {
        console.log(questions[counter++], value.content);
      });
    });

    await interaction.reply(
      `Your tag: ${interaction.user.tag}\n` + `Your id: ${interaction.user.id}`
    );
  },
});
