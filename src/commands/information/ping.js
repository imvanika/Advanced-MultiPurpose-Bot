class BasePing {
    constructor(client){
        this.client = client;
        this.name = "ping";
        this.run = async(message,args,prefix) => {
            return message.reply({
                embeds: [
                    this.client.embed
                    .setDescription(`${this.client.ws.ping} MS!`)
                ]
            });
        }
    }
}

module.exports = BasePing;