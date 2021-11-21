import { mountCommand } from '../utils';

export default mountCommand({
  name: 'ping',
  description: 'Replies with Pong!',
  action: async (interaction) => {
    await interaction.reply('Pong!');
  },
});
