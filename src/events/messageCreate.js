const guild = require("../models/guild");

class BaseMessageCreate {
    constructor(client){
        this.client = client;
        this.name = "messageCreate";
        this.event = "MessageCreateEvent";
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

        command.run(message,args,prefix).catch((e) => {
            console.log(e);
        });

        return;
    }
}

module.exports = BaseMessageCreate;