const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
    if(!user) return message.channel.send("L'utilisateur est introuvable");

    const embed = new MessageEmbed()
        .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
        .setColor("#ffa500")
        .setDescription(`**Action** : unban`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    const log_channel = bot.channels.cache.get('756188861272424482');
    log_channel.send(embed);

    await message.guild.members.unban(user) && message.channel.send(`L'utilisateur <@${user.id}> a été unban`);
};


module.exports.help = COMMANDS.MODERATION.UNBAN;