const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');

module.exports.run = async (bot, message, args) => {
    const data = await bot.db.models.guilds.findOne({
        where: {
            guildID: message.guild.id
        }
    });

    // if (!message.guild.channels.get(channelId)) return message.reply("Ce salon est introuvable");

    if (args[0] === "off"){
        if (data.enable_welcome === false) return message.channel.send("Cette action est déjà désactivée")
        data.enable_welcome = false;
        data.save();
        message.channel.send("Le message de bienvenue a été désactivé")
    }
    else {
        try {
            const channelId =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]).id;
            if (data.enable_welcome === true && data.welcome_chan === channelId){
                message.channel.send("Ce salon est déjà séléctionné")
            }
            else{
                data.welcome_chan = channelId;
                message.channel.send(`Le salon de bienvenue est désormais <#${channelId}>`)
            }
            data.enable_welcome = true;
            data.save();
        }
        catch (err) {
            message.channel.send("Commande invalide.\nVeuillez préciser `off` ou un `channel`")
        }
    }
};


module.exports.help = COMMANDS.ADMINISTRATOR.SETWELCOMECHANNEL;