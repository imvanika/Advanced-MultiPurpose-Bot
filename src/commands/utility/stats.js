const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

class BaseStats {
    constructor(client){
        this.client = client;
        this.name = "stats";
        this.category = "utility";
        this.run = async(message,args,prefix) => {
            let row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("team")
                .setLabel("Team Info"),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("general")
                .setDisabled(true)
                .setLabel("General Info"),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("system")
                .setLabel("System Info")
            )

            let em = new EmbedBuilder()
            .setColor("FF0000")
            .setAuthor({name: `${client.user.username}'s Information`, iconURL: client.users.cache.get(`991312753279127652`).displayAvatarURL()})
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {
                    name: "__General Information__",
                    value: `Bot's Mention: ${client.user}\nBot's Tag: ${client.user.tag}\nBot's Version: 1.0.0\nTotal Servers: ${client.guilds.cache.size}\nTotal Users: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} (${client.users.cache.size} Cached)\nTotal Channels: ${client.channels.cache.size}\nLast Rebooted: <t:${Math.floor(client.readyAt / 1000)}:R>`
                }
            ])

            let msg = await message.reply({ embeds: [em], components: [row] });
            let collector = await msg.createMessageComponentCollector({
                filter: (b) => {
                  if (b.user.id === message.author.id) return true;
                  else {
                    return b.reply({
                      content: `${client.emoji.cross} You are not the requester`,
                      ephemeral: true
                    })
                  }
                }, time: 600000 * 5, idle: 10000000 * 4
              });

            collector.on("collect", async(button) => {
                if(button.isButton()) {
                    if(button.customId === "general") {
                        let row1 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setCustomId("team")
                            .setLabel("Team Info"),
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setCustomId("general")
                            .setDisabled(true)
                            .setLabel("General Info"),
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setCustomId("system")
                            .setLabel("System Info")
                        )

                        return button.update({
                            embeds: [em], components: [row1]
                        })
                    }

                    if (button.customId === "team") {
                        let guild = await client.guilds.fetch("1160915647031689297");
                        let vanika = await guild.members.fetch("991312753279127652");
                        let punit = await guild.members.fetch("765841266181144596");
                        let ragnor = await guild.members.fetch("1090957904410071120");
                    
                        console.log(vanika.presence)
                        // if(vanika.presence.status === "offline") {
                        //     console.log("Offline ho gyi wo dede")
                        // }
                        
                    }
                }
            })
        }
    }
}

module.exports = BaseStats;