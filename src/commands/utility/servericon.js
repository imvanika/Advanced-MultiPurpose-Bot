const { EmbedBuilder } = require("discord.js");

class BaseServerIcon {
    constructor(client){
        this.client = client;
        this.name = "servericon";
        this.aliases = ["serveri", "serverav", "sav"];
        this.category = "utility";
        this.run = async(message,args,prefix) => {     
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setDescription(`[\`PNG\`](${message.guild.iconURL({dynamic : true , format : 'png'})}) | [\`JPG\`](${message.guild.iconURL({dynamic : true , format : 'jpg'})}) | [\`WEBP\`](${message.guild.iconURL({dynamic : true , format : 'webp'})})`)
                    .setImage(message.guild.iconURL({dynamic : true , size : 512 }))
                    .setTimestamp()
                ]
            });
        }
    }
}

module.exports = BaseServerIcon;