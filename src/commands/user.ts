import { mountCommand } from '../utils';

export default mountCommand({
  name: 'user',
  description: 'Replies with user info!',
  action: async (interaction) => {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\n` + `Your id: ${interaction.user.id}`
    );
  },
});
