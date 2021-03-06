const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = (bot, member) => {
    const img = new MessageAttachment('./images/Logo_Komorebi_JP.png')
    console.log(member)

    const joinEmbed = new MessageEmbed()
        .setAuthor("Bienvenue sur 𝗙𝗖 𝗞𝗼𝗺𝗼𝗿𝗲𝗯𝗶™", 'attachment://Logo_Komorebi_JP.png')
        .setColor('#bb1f1f')
        .setDescription(`<@${member.id}> vient de rejoindre la Komorebi !\nOn est maintenant ${member.guild.memberCount}`)
        .setThumbnail(`${member.user.avatarURL()}`)
        .setFooter('Komorebi Bot')
        .setTimestamp()
    const log_channel = bot.channels.cache.get('756188861272424482');
    log_channel.send({ files: [img], embed: joinEmbed });
}