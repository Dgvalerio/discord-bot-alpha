import { differenceInMinutes, format } from 'date-fns';
import { MessageEmbed } from 'discord.js';

import { FirebaseController } from '../firebase/controller';
import { mountCommand } from '../utils';

export default mountCommand({
  name: 'today',
  description: 'Retorna os apontamentos de hoje.',
  action: async (interaction) => {
    const firebase = new FirebaseController();

    const response = await firebase.todayAppointments();

    const { username, url } = {
      username: interaction.user.username,
      url: interaction.user.avatarURL() || '',
    };

    const embed = () =>
      new MessageEmbed().setAuthor(username, url, url).setThumbnail(url);

    await interaction.reply(JSON.stringify('Apontamentos:'));
    if (response.length > 0) {
      response.forEach(({ message, start, close }) => {
        const activeTime = differenceInMinutes(
          close ? new Date(close) : new Date(),
          new Date(start)
        );

        const minutes = activeTime % 60;
        const hours = (activeTime - minutes) / 60;

        const started = format(start, 'HH:mm');
        const closed = close && format(close, 'HH:mm');

        return interaction.channel?.send({
          embeds: [
            embed()
              .setTitle(message || 'Atualmente ativo')
              .setDescription(
                `Tarefa iniciada às ${started}` +
                  (close ? ` e finalizada às ${closed}.` : '.')
              )
              .addField('\u200B', '\u200B', false)
              .addField(
                'Duração:',
                `${hours} horas e ${minutes} minutos.`,
                false
              )
              .setColor('#00c853'),
          ],
        });
      });

      const totalMinutes = response.reduce((previous, current) => {
        const activeTime = differenceInMinutes(
          current.close ? new Date(current.close) : new Date(),
          new Date(current.start)
        );

        return previous + activeTime;
      }, 0);

      const minutes = totalMinutes % 60;
      const hours = (totalMinutes - minutes) / 60;

      interaction.channel?.send({
        embeds: [
          embed()
            .setTitle(
              `Hoje foram trabalhadas ${hours} horas e ${minutes} minutos.`
            )
            .setColor('#304ffe')
            .addField('\u200B', '\u200B', false)
            .setTimestamp(),
        ],
      });
    } else {
      interaction.channel?.send({
        embeds: [
          embed()
            .setTitle('Um apontamento já foi iniciado!')
            .setColor('#d50000')
            .setDescription(
              'Nenhum apontamento foi realizado hoje.\n\n\nSe desejar, tente inciar um com: \n``fix\n/start\n```'
            )
            .addField('\u200B', '\u200B', false),
        ],
      });
    }
  },
});
