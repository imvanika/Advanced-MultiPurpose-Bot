const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 3276799,
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    allowedMentions: {
        repliedUser: true,
        parse: ["everyone", "roles", "users"]
    }
});

module.exports = client;

client.emoji = require("./emojis.json");
client.config = require("./config.js");
client.events = new Collection();
client.commands = new Collection();
require(`${process.cwd()}/src/handler/main.js`);

const token = client.config.token
client.login(token);
if(!token || typeof token !== "string") {
    throw new Error("[TokenInvalid]: Provide a valid token in config.js")
}

process.on('unhandledRejection', async (er) => {
    console.log(er);
});

process.on('uncaughtException', async (err) => {
    console.log(err);
})