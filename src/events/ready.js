module.exports = async (client) => {
    console.log(`${client.user.username} is online and ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)
}