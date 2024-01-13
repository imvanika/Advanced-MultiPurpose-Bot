class BaseReady {
    constructor(client) {
        this.client = client;
        this.name = "ready";
        this.event = "Ready Event";
    }
    run() {
        this.client.user.setPresence({
            activities: [{
                name: "Base Client",
                type: 2
            }],
            status: "customStatus"
        });
        this.client.logger.ready(`Client Is Deployed With User Tag: ${this.client.user.tag}!`);
    }
}

module.exports = BaseReady;