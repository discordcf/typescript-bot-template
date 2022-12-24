import { command } from './cmd/cmd';
import { createApplicationCommandHandler, Permissions } from '@discordcf/framework';
import clickMePrimaryComponent from './components/click-me-primary';

let applicationCommandHandler: (request: Request) => any;

export interface Env {
  /*
  * These environment variables are needed for your bot to work.
  */
  APPLICATION_ID: string
  CLIENT_SECRET: string
  PUBLIC_KEY: string
  BOT_TOKEN: string
  GUILD_ID?: string  // The GUILD_ID is optional. Don't set it up if you want your command at global level.

  /*
  * You can add more environment variables or bindings.
  * For instance, you could add here the KVNamespace.
  */

  // KV_NAMESPACE: KVNamespace
}

export default {
  fetch: async (request: Request, env: Env, context: ExecutionContext): Promise<Response> => {
    if (!applicationCommandHandler) {
      applicationCommandHandler = createApplicationCommandHandler({
        applicationId: env.APPLICATION_ID,
        publicKey: env.PUBLIC_KEY,
        botToken: env.BOT_TOKEN,
        commands: [command], // Import and register your commands here.
        components: [clickMePrimaryComponent], // Import and register your message components here.
        guildId: env.GUILD_ID,  // Look at the GUILD_ID comment above.
        permissions: new Permissions(
          [ 
            'SendMessages', // Add your bot permissions here as a list of string.
          ]
        )
      },
      env,
      context);
    }
    return applicationCommandHandler(request);
  },
}

