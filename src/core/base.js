require("dotenv").config();

const { Client } = require("discord.js");
const Logger = require("./logger");
const { BaseHandler } = require("./handler");
const { BaseEmbeds } = require("./handler");

class BaseClient extends Client {
    constructor(options) {
        super(options);
        this.config = require("../config/variables.json");
        this.emoji = require("../config/emojis.json");
        this.logger = new Logger(this);
        this.handler = new BaseHandler(this);
    }

    async _init() {
        this.config.token = process.env.token;
        this.logger.log("Initiated The Client!");
        this.handler.connecteDB();
        this.handler.loadEvents();
        this.handler.loadCommands();
        this.logger.log("Attempting To Access The Client...");
        await this.login(this.config.token);
        this.logger.log(`Successfully Logged In To The Client!`);
        this.logger.log("Initialization Of The Bot Is Completed!");
    }
    embed() {
        return new BaseEmbeds(this);
    }
}

module.exports = BaseClient;