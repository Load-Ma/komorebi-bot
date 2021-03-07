const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = async (bot, message, args) => {
    const channelId =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]).id;
    const data = await bot.db.models.guilds.findOne({
        where: {
            guildID: message.guild.id
        }
    });

    // if (!message.guild.channels.get(channelId)) return message.reply("Ce salon est introuvable");

    if (args[0] === "off"){
        if (data.enable_leave === false) return message.channel.send("Cette action est déjà désactivée")
        data.enable_leave = false;
        data.save();
    }
    else if (channelId) {
        if (data.leave_chan === channelId){
            message.channel.send("Ce salon est déjà séléctionné")
        }
        else{
            data.leave_chan = channelId;
            message.channel.send(`Le salon d'au revoir est désormais ${channelId}`)
        }
        data.enable_leave = true;
        data.save();
    }
    else {
        message.channel.send("Commande invalide.\nVeuillez préciser 'off' ou un 'channel'")
    }
};


module.exports.help = COMMANDS.ADMINISTRATOR.SETLEAVECHANNEL;