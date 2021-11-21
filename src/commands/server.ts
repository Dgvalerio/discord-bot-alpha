import { mountCommand } from '../utils';

export default mountCommand({
  name: 'server',
  description: 'Replies with server info!',
  action: async (interaction) => {
    await interaction.reply(
      `Server name: ${interaction.guild?.name}\n` +
        `Total members: ${interaction.guild?.memberCount}`
    );
  },
});
