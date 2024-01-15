const { EmbedBuilder } = require("discord.js");
const { inspect } = require("util");

class BaseEval {
    constructor(client) {
        this.client = client;
        this.name = "eval";
        this.aliases = ["jaadu", "vanika"];
        this.category = "utility";
        this.run = async(message,args,prefix) => {
            if(!client.access.dev.includes(message.author.id)) return;
            if(!args[0]) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("FF0000")
                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                        .setDescription(`${client.emoji.cross} Provide a code to evaluate.`)
                    ]
                })
            }

            let code = args.join(' ');
            if(code.includes("config") || code.includes("token") || code.includes("mongo")) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("FF0000")
                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                        .setDescription(`${client.emoji.cross} I can not provide you these things.`)
                    ]
                })
            }

            let send;
            try {
                send = await eval(code);
                send = inspect(send, {
                    depth: 0
                })
            } catch(e) {
                send = inspect(e, {
                    depth: 0
                });
            }

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setDescription(`\`\`\`js\n${send}\`\`\``)
                ]
            })
        }
    }
}

module.exports = BaseEval;