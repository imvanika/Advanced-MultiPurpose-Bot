const guild = require("../models/guild");

class BaseMessageCreate {
    constructor(client){
        this.client = client;
        this.name = "messageCreate";
        this.event = "MessageCreate Event";
    }
    
    async run(message) {
        if(message.author.bot) return;
        if(message.channel.type === 1) return;
        
        let prefix = await guild.findOne({ guildId: message.guild.id });
        if(!prefix) prefix = this.client.config.prefix;
        else prefix = prefix.prefix;

        if(message.content === `<@${this.client.user.id}>`) {
            return message.reply({
                content: `Hey There I am An Awesome Multipurpose, Feature Packed Multipurpose Bot by Vanika the OG!`
            }).catch(() => {});
        }
        
        let reg = new RegExp(`^<@!?${this.client.user.id}>`);
        let pre = message.content.match(reg) ? message.content.match(reg)[0] : prefix;

        let np = [];

        if(!np.includes(message.author.id)) {
            if(!message.content.startsWith(pre)) return;
        }

        const args = np.includes(message.author.id) === false ? message.content.slice(pre.length).trim().split(/ +/) : message.content.startsWith(pre) === true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = this.client.commands.get(commandName) || this.client.commands.find(x => x.aliases && x.aliases.includes(commandName));
        if(!command) return;

        if(command.clientPermissions) {
            if(!Array.isArray(command.clientPermissions)) {
                this.client.logger.error("Client permissions must be passed in array.");
            }
            for(let i = 0; i < command.clientPermissions.length; i++) {
                if(!message.guild.members.me.permissions.has(command.clientPermissions[i]))
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`${client.emoji.cross} I am Missing **${command.clientPermissions[i]}** in this Server!`)
                            .setAuthor({ name: "Permissions Error", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        ]
                    });
            }
        }

        if(command.userPermissions) {
            if(!Array.isArray(command.userPermissions)) {
                this.client.logger.error("User Permissions must be passed in array.");
            }
            for(let i = 0; i < command.userPermissions.length; i++) {
                if(!message.member.permissions.has(command.userPermissions[i])) 
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`${client.emoji.cross} You are missing **${command.userPermissions[i]}** permissions to use this command.`)
                            .setAuthor({ name: "Permissions Error", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        ]
                    });
            }
        }

        command.run(message,args,prefix).catch((e) => {
            console.log(e);
        });

        return;
    }
}

module.exports = BaseMessageCreate;