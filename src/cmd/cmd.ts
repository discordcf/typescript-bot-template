import { Command, CommandInteractionHandler, InteractionDataType } from '@discordcf/core';
import { APIInteractionResponse, InteractionResponseType } from 'discord-api-types/v10';

// Your command can use any InteractionType
export const command: Command<InteractionDataType.APIChatInputApplicationCommandInteractionData> = [
  {
    name: "cmd",
    description: "A command.",
  }, // There are more options for this object: https://discord-api-types.dev/api/discord-api-types-v9/interface/APIApplicationCommand
  async (interaction, env, context): Promise<APIInteractionResponse> => {
    /* This arrow function works as a command handler.
    * Everytime the command is called, this function is executed.
    *
    * You can use any of the three variables: interaction, env, and context in the handler.
    */

    return {
      type: InteractionResponseType.ChannelMessageWithSource, // The command supports any of the InteractionResponseType
      data: {
        content: `A commmand`,
      },:
    };
  }
];

export default command;
