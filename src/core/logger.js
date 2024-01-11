const chalk = require("chalk");
const moment = require("moment");
const time = `${moment().utcOffset("+5:30").format("DD/MM/YYYY | hh:mm:ss")}`;

class Logger{
    constructor(client) {
        this.client = client;
    }
    log(content) {
        console.log(
            chalk.grey(time) + " " +  chalk.hex("#CF9FFF")("[LOG]") + " " + content
        )
    }
    error(content) {
        console.log(
            chalk.grey(time) + " " + chalk.hex("#fc0000")("[ERROR]") + " " + content
        );
    }
    debug(content) {
        console.log(
            chalk.grey(time) + " " + chalk.hex("#00ccfc")("[DEBUG]") + " " + content
        );
    }
    warn(content){
        console.log(
            chalk.grey(time) + " " + chalk.hex("##d7fc00")("[WARN]") + " " + content
        );
    }
    ready(content) {
        console.log(
            chalk.grey(time) + " " + chalk.hex("#53f00d")("[READY]") + " " + content
        );
    }
    event(content) {
        console.log(
            chalk.grey(time) + " " + chalk.hex("#fac90f")("[EVENT]") + " " + content
        );
    }
    cmd(content) {
        console.log(
            chalk.grey(time) + " " + chalk.hex("#fc0075")('[CMD]') + " " + content
        );
    };
}

module.exports = Logger;