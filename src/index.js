const { Partials } = require("discord.js");
const BaseClient = require("./core/base");

const clientOptions = {
    intents: [
        "Guilds",
        "GuildBans",
        "GuildMessages",
        "MessageContent",
        "GuildMembers",
        "GuildVoiceStates",
    ],
    allowedMentions: {
        repliedUser: false,
        parse: ["everyone","roles","users"]
    },
    failIfNotExists: true,
    partials: [
        Partials.GuildMember,
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.Reaction
    ]
};

const client = new BaseClient(clientOptions);
client._init();

module.exports = client;