const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = async (bot, member) => {
    const data = await bot.db.models.guilds.findOne({
        where: {
            guildID: member.guild.id
        }
    });

    const rand = Math.floor(Math.random() * 2) + 1;

    if (!data.enable_welcome) return;
    const img = new MessageAttachment('./images/Logo_Komorebi_JP.png')
    const joinEmbed = new MessageEmbed()
        .setAuthor("Bienvenue sur 𝗙𝗖 𝗞𝗼𝗺𝗼𝗿𝗲𝗯𝗶™", 'attachment://Logo_Komorebi_JP.png')
        .setColor('#bb1f1f')
        .setDescription(`<@${member.id}> vient de rejoindre la Komorebi !\nOn est maintenant ${member.guild.memberCount}`)
        .setThumbnail(`${member.user.avatarURL()}`)
        .setTimestamp()
        if (rand === 2) joinEmbed.setFooter('inwi pro rusher te souhaite la bienvenue')
        if (rand === 1) joinEmbed.setFooter('PatAficss pro rusher te souhaite la bienvenue')
        else joinEmbed.setFooter('Komorebi Bot')
        const log_channel = bot.channels.cache.get(data.welcome_chan);
    log_channel.send({ files: [img], embed: joinEmbed });
}