const { EmbedBuilder } = require("discord.js");

class BasePing {
    constructor(client){
        this.client = client;
        this.name = "ping";
        this.run = async(message,args,prefix) => {
            let latency = client.ws.ping;
            let ping;
            if(latency < 50) ping = "Very Fast!";
            if(latency > 50 && latency < 100) ping = "Average!";
            if(latency > 100) ping = "Very Slow!"
            
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("FF0000")
                    .setAuthor({name: `${client.ws.ping}ms Pong!`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setFooter({text: `Respond Speed: ${ping}`, iconURL: client.user.displayAvatarURL()})
                ]
            });
        }
    }
}

module.exports = BasePing;