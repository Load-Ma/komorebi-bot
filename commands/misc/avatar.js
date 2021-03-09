const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = async (bot, message, args) => {

    const AvEmbed = new MessageEmbed()
    if (!args.length) {
        AvEmbed.setColor('#bb1f1f')
        AvEmbed.setTitle(`Avatar de ${message.author.username}`)
        AvEmbed.setImage(message.author.displayAvatarURL({dynamic: true, size: 512}))
        message.channel.send(AvEmbed)
    }
    else {
        try {
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            AvEmbed.setColor('#bb1f1f')
            AvEmbed.setTitle(`Avatar de ${user.user.username}`)
            AvEmbed.setImage(user.user.displayAvatarURL({dynamic: true, size: 512}))
            message.channel.send(AvEmbed)
        }
        catch (err) {
            return message.channel.send("Utilisateur introuvable")
        }
    }

};

module.exports.help = COMMANDS.MISC.AVATAR;