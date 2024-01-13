const { EmbedBuilder } = require("discord.js");

class BaseStats {
    constructor(client){
        this.client = client;
        this.name = "stats";
        this.run = async(message,args,prefix) => {
            
        }
    }
}

module.exports = BaseStats;