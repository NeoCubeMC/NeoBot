import {
    ArgsOf,
    Client, Discord, On,
} from "@typeit/discord";

async function delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
}

import {Message, MessageReaction} from "discord.js";

const server = "555920952236441612"
const suggestionChannel = "555928349529079829"

@Discord("+")
export abstract class NeoBot {

    private static async setupUserPool(message: Message) {
        const reactions = [
            "\u0031\uFE0F\u20E3",
            "\u0032\uFE0F\u20E3",
            "\u0033\uFE0F\u20E3",
            "\u0034\uFE0F\u20E3",
            "\u0035\uFE0F\u20E3",
            "\u0036\uFE0F\u20E3",
            "\u0037\uFE0F\u20E3",
            "\u0038\uFE0F\u20E3",
            "\u0039\uFE0F\u20E3",
            "🔟"

        ]
        for (let reaction of reactions) {
            await message.react(reaction);
        }
    }

    @On("message")
    private async onMessage(
        [message]: ArgsOf<"message">, // Type message automatically
        client: Client, // Client instance injected here,
        guardPayload: any
    ) {
        if (message.channel.id == suggestionChannel) {
            await NeoBot.setupUserPool(message)
        }
    }

    @On("messageReactionAdd")
    private async onReact(
        [reaction, user]: ArgsOf<"messageReactionAdd">, // MessageReaction, User | PartialUser
        client: Client, // Client instance injected here,
        guardPayload: any
    ) {
        if (user == client.user) {
            return;
        }
        let msg = reaction.message;
        const found: Array<MessageReaction> = msg.reactions.cache.array();
        found.forEach(other => {
            if (other == reaction) {
                return;
            }
            if (other.users.cache.has(user.id)) {
                other.users.remove(user.id);
            }
        });
    }
}
