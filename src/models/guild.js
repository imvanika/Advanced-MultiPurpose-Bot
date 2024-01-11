const { Schema, model } = require("mongoose");
const Config = require("../config/variables.json");
const guild = new Schema({
    guildId: String,
    prefix: {
        type: String,
        default: Config.prefix
    },
});

module.exports = model("guilddata",guild);