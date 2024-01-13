const { EmbedBuilder } = require("discord.js");

class BaseUptime {
    constructor(client) {
        this.client = client;
        this.name = "uptime";
        this.category = "utility";
        this.run = async(message,args,prefix) => {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setDescription(`I am online since <t:${Math.floor(client.readyAt / 1000)}:R>`)
                ]
            })
        }
    }
}

module.exports = BaseUptime;