const { EmbedBuilder } = require('discord.js');

class BaseBanner {
    constructor(client) {
        this.client = client;
        this.name = "banner";
        this.subCommands = ["user", "server"];
        this.run = async(message, args, prefix) => {
            if(!args[0]) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("FF0000")
                        .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                        .setDescription(`\`${prefix}banner user [user=<you>]\`\nShows banner of a user\n\n\`${prefix}banner server\`\nShows banner of a server`)
                    ]
                })
            }

            if(args[0].toLowerCase() === "server") {
                if(!message.guild.banner) {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor("FF0000")
                            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                            .setDescription(`${client.emoji.cross} This server doesn't have a banner`)
                        ]
                    })
                }

                else {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor("FF0000")
                            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                            .setDescription(`[Click here to get the server banner](${message.guild.bannerURL({dynamic : true , size : 4096 , format : 'gif'})})`)
                            .setImage(message.guild.bannerURL({dynamic : true , size : 4096}))
                            .setFooter({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
                        ]
                    })
                }
            }

            if(args[0].toLowerCase() === "user") {
                let user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;
                let banner = false;
                try {
                    await user.fetch().then(user => {
                        if(user.banner) {
                            banner = user.bannerURL({
                                dynamic: true,
                                size: 4096
                            })
                        }
                    })

                    if(banner) {
                        return message.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setColor("FF0000")
                                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                                .setImage(banner)
                                .setFooter({text: user.username, iconURL: user.displayAvatarURL({dynamic: true})})
                            ]
                        })
                    } else {
                        message.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setColor("FF0000")
                                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
                                .setDescription(`${client.emoji.cross} This user doesn't have a banner`)
                            ]
                        })
                    }
                } catch(e) {
                    console.log(e)
                }
            }
        }
    }
}

module.exports = BaseBanner;