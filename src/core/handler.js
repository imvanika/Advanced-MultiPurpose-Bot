const fs = require("node:fs");
const { Collection, EmbedBuilder, resolv } = require("discord.js");
const { connect } = require("mongoose");

class BaseHandler {
    constructor(client) {
        this.client= client;
        this.client.commands = new Commands();
        this.eventsLoaded = false;
        this.commandsLoaded = false;
        this.DBConnected = false;
    }

    loadEvents() {
        if(this.eventsLoaded) return this;
        this.client.logger.log("Initiated The Events!");
        fs.readdirSync(`./src/events/`).forEach((x) => {
            let file = require(`../events/${x}`);
            let event = new file(this.client);
            let run = event.run.bind(event);
            this.client.on(event.name,run);
            this.client.logger.event(`Loaded ${event.event}`);
        });
        this.client.logger.log(`Finished Loading Events!`);
        this.eventsLoaded = true;
        return this;
    }

    loadCommands() {
        if(this.commandsLoaded) return this;
        this.client.logger.log("Initiated The Commands!");
        fs.readdirSync(`./src/commands/`).forEach((dir) => {
            fs.readdirSync(`./src/commands/${dir}`).filter(x => x.endsWith(".js")).forEach(cmd => {
                let file = require(`../commands/${dir}/${cmd}`);
                let command = new file(this.client);
                this.client.commands.set(command.name,command);
                this.client.logger.cmd(`Loaded ${command.name} Command`);
            })
        });
        this.client.logger.log("Finished Logging Commands To The Client!");
        this.commandsLoaded = true;
        return this;
    }

    async connecteDB() {
        if(this.DBConnected) return this;
        else {
            await connect(this.client.config.dbUrl,{
                family: 4,
                autoIndex: false,
                connectTimeoutMS: 10000,
            }).then(() => {
                this.client.logger.ready("Database Connection Established Successfully");
            }).catch((e) => {
                this.client.logger.error(e);
            });

            this.DBConnected = true;
            return this;
        }
    }
}


class Commands extends Collection {
    constructor() {
        super();
    }
}

class BaseEmbeds extends EmbedBuilder{
    constructor(client) {
        super();
        this.client = client;
    }
    color(color) {
        if(resolveC)
        return this.setColor(color);
    }
}

module.exports.BaseHandler = BaseHandler;
module.exports.BaseEmbeds = BaseEmbeds;