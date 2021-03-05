const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
    const reason = (args.splice(1).join(' '));

    if(!user) return message.channel.send("L'utilisateur est introuvable");
    if(!user.bannable) return message.channel.send("Impossible, peut-être qu'il me manque les permissions ou il a peut etre un role supérieur");
    if(user.id === message.author.id) return message.channel.send("Toi t'as un QI négatif");

    const LogBanEmbed = new MessageEmbed()
        .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
        .setColor("#ffa500")
        .setDescription(`**Action** : ban\n**Raison**: ${reason}`)
        .setThumbnail(user.user.avatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    const log_channel = bot.channels.cache.get('756188861272424482');
    log_channel.send(LogBanEmbed);


    user ? user.ban({ reason:reason }) && message.channel.send(`L'utilisateur <@${user.id}> a été ban`) : message.channel.send("L'utilisateur est introuvable");
};


module.exports.help = COMMANDS.MODERATION.BAN;