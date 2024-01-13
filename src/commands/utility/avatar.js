const { EmbedBuilder } = require("discord.js");

class BaseAvatar {
    constructor(client){
        this.client = client;
        this.name = "avatar";
        this.aliases = ["av"];
        this.category = "utility";
        this.run = async(message,args,prefix) => {
            let user;
            if(!user || user == null) user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

            if(!user || user === null) return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(`FF0000`)
                    .setDescription(`${client.emoji.cross} Please provide a valid member.`)
                ]
            })

            else {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("FF0000")
                        .setDescription(`[\`PNG\`](${user.displayAvatarURL({dynamic : true , format : 'png'})}) | [\`JPG\`](${user.displayAvatarURL({dynamic : true , format : 'jpg'})}) | [\`WEBP\`](${user.displayAvatarURL({dynamic : true , format : 'webp'})})`)
                        .setImage(user.displayAvatarURL({dynamic : true , size : 512}))
                        .setFooter({text: "Requested by "+message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    ]
                })
            }
        }
    }
}

module.exports = BaseAvatar;