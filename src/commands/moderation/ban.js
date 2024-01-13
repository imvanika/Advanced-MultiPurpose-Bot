class BaseBan{
    constructor(client) {
        this.client = client;
        this.name = "ban";
        this.alaises = ['fuckoff','fuckyou'];
        this.description = "Bans a member from the server";
        this.category = "mod";
        this.clientPermissions = ['BanMembers'];
        this.userPermissions = ['BanMembers'];
        this.run = async(message,args,prefix) => {
            if(!args[0]) {
                return message.reply({
                    embeds:[
                        new EmbedBuilder()
                        .setColor("#ff0000")
                        .setDescription(`${this.client.emoji.cross} | Please Provide Valid user ID or Mention Member. `)
                    ]
                });
            }
            let user = message.mentions.members.filter(x => x.user.id !== client.user.id).first();
            if(!user && args[0]) user = await message.guild.members.fetch(args[0]).catch(() => { });

            if(!user) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#ff0000")
                        .setDescription(`${client.emoji.cross} | Please Provide Valid user ID or Mention Member.`)
                    ]
                });
            }

            if(message.member.roles.highest.position <= user.roles.highest.position && message.author.id !== message.guild.ownerId) {
                return message.reply({
                    content: ``
                })
            }
        }
    }
}

module.exports = BaseBan;