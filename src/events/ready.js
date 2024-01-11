class BaseReady {
    constructor(client) {
        this.client = client;
        this.name = "ready";
        this.event = "ReadyEvent";
    }
    run() {
        this.client.logger.ready(`Client is Ready with Username: ${this.client.user.username} and tag: ${this.client.user.tag}!`);
    }
}

module.exports = BaseReady;