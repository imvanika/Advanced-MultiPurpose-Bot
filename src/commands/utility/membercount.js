const { EmbedBuilder } = require("discord.js");

class BaseMemberCount {
    constructor(client){
        this.client = client;
        this.name = "membercount";
        this.aliases = ["mc"];
        this.category = "utility";
        this.run = async(message,args,prefix) => {
            
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle("Members")
                    .setDescription(`${message.guild.memberCount}`)
                    .setTimestamp()
                ]
            });
        }
    }
}

module.exports = BaseMemberCount;