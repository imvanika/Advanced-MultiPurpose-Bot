const { Client } = require("discord.js");
const Logger = require("./logger");
const BaseHandler = require("./handler");

class BaseClient extends Client {
    constructor(options) {
        super(options);
        this.config = require("../config/variables.json");
        this.emoji = require("../config/emojis.json");
        this.logger = new Logger(this);
        this.handler = new BaseHandler(this);
    }

    async _init() {
        this.logger.log("Initiated the Bot....");
        this.handler.connecteDB();
        this.handler.loadEvents();
        this.handler.loadCommands();
        this.logger.log("Logging In....");
        await this.login(this.config.token);
        this.logger.log(`Logged In...`);
        this.logger.log("Finished Starting the Bot....");
    }
}

module.exports = BaseClient;