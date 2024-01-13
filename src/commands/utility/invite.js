const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

class BaseInvite {
    constructor(client){
        this.client = client;
        this.name = "invite";
        this.run = async(message,args,prefix) => {
            let b1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel(`Invite Me`)
              .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
            );

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setDescription(`[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`)
                ], components: [b1]
            });

        }
    }
}

module.exports = BaseInvite;