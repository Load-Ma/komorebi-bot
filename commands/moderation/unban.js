const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = async (bot, message, args) => {
    const user = await bot.users.fetch(args[0]);
    if(!user) return message.channel.send("L'utilisateur est introuvable");
    await message.guild.members.unban(user)

    const embed = new MessageEmbed()
        .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
        .setColor("#ffa500")
        .setDescription(`**Action** : unban`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    const log_channel = bot.channels.cache.get('756188861272424482');
    log_channel.send(embed);
};


module.exports.help = COMMANDS.MODERATION.UNBAN;