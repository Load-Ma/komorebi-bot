const { COMMANDS } = require('../../util/HELP');
const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[1]);
    const wlu = await bot.db.models.user_whitelist;
    const wlList =  await wlu.findAll()

    const rand = Math.floor(Math.random() * 2) + 1;

    if (!args.length) {
        const embed = new MessageEmbed()
            .setColor("#49FF00")
            .setTitle(`Whitelist user`)
        embed.setDescription(`Voici tous les utilisateurs de la whitelist\n` + wlList
            .filter(x => bot.users.cache.get(x.userID))
            .map((x, i) => "\n"  + (i + 1) +". "+ `${bot.users.cache.get(x.userID).toString()}`)
        )
        rand === 1 ? embed.setFooter(`💛 Heureuse`) : embed.setFooter(`💛 Naeko`)
        return message.channel.send(embed);
    }
    else if (args[0] == "add") {
        if (!user) {
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription("Vous devez préciser un utilisateur valide")
            return message.channel.send(embed)
        }
        let exists = wlList.find(x => x.userID === user.id)
        if (exists){
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription("Ce utilisateur est déjà whitelist")
            message.channel.send(embed)
        }else{
            wlu.create({
                userID: user.id,
                whitelist: true
            })
            const embed = new MessageEmbed()
                .setColor("#49FF00")
                .setDescription(`L'utilisateur ${user.user.username} a été ajouté à la whitelist`)
            return message.channel.send(embed)
        }
    }
    else if (args[0] == "remove") {
        if (!user) {
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription("Vous devez préciser un utilisateur valide")
            return message.channel.send(embed)
        }
        let exists = wlList.find(x => x.userID === user.id)
        if (exists){
            wlu.destroy({
                where: {
                    userID: user.id
                }
            });
            const embed = new MessageEmbed()
                .setColor("#49FF00")
                .setDescription(`L'utilisateur ${user.user.username} a été retiré à la whitelist`)
            return message.channel.send(embed)
        }else{
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription("Cet utilisateur n'est pas whitelist")
            return message.channel.send(embed)
        }
    }
    else{
        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription("ce paramètre est invalide, vous pouvez utiliser : <add/remove>")
        return message.channel.send(embed)
    }

}

module.exports.help = COMMANDS.ADMINISTRATOR.WHITELIST;