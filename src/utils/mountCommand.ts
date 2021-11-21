import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export namespace MountCommand {
  export type Params = {
    name: string;
    description: string;
    action: (interaction: CommandInteraction) => Promise<void>;
  };
  export type Model = {
    data: SlashCommandBuilder;
    action: (interaction: CommandInteraction) => Promise<void>;
  };
  export type Mounter = (params: MountCommand.Params) => MountCommand.Model;
}

export const mountCommand: MountCommand.Mounter = ({
  name,
  description,
  action,
}) => ({
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  action,
});
