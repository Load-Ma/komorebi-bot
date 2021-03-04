const { COMMANDS } = require('../../util/HELP');
const { MessageEmbed } = require('discord.js')

module.exports.run = (bot, message, args) => {

    let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
        }))
        .setColor("RANDOM")
        .setTitle('__**» Ping...**__')
        .addField("Latence du bot", "Chargement...", true)
        .addField("Latence de l'API", "Chargement...", true)
        .setTimestamp()

    message.channel.send(embed).then(msg => {
        let ping = msg.createdAt - message.createdAt + "ms"
        let pingapi = Math.round(bot.ws.ping) + "ms"

        let embed2 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }))
            .setColor("RANDOM")
            .setTitle('__**» Pong !**__')
            .addField("Latence avec les serveurs", ping, true)
            .addField("Latence avec l'API", pingapi, true)
            .setTimestamp()
        msg.edit(embed2);
    });

}

module.exports.help = COMMANDS.DEVELOPPER.PING;