class BaseMessageCreate {
    constructor(client){
        this.client = client;
        this.name = "messageCreate";
        this.event = "MessageCreateEvent";
    }
    
    run(message) {
        if(message.author.bot) return;
        if(message.channel.type === 1) return;
        
    }
}

module.exports = BaseMessageCreate;