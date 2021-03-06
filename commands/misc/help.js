const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');
const { COMMANDS } = require('../../util/HELP');

let prefix = config.setting.prefix;

module.exports.run = (bot, message, args) => {
    if(!args.length) {
        const embed = new MessageEmbed()
            .setColor('#bb1f1f')
        embed.setDescription(`Prefix : \`${prefix}\` \nPour obtenir l'utilisation d'une commande \`${prefix}help <nom commande>\``)
        for (const category of categoryList) {
            if (bot.config.auth.owner.includes(message.author.id)){
                embed.addField(
                    `${category}`,
                    `\`${bot.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join('`, `')}\``
                );
            }else if (bot.config.auth.developper.includes(message.author.id) && category !== "owner"){
                embed.addField(
                    `${category}`,
                    `\`${bot.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join('`, `')}\``
                );
            }else if (category !== "developper" && category !== "owner"){
                embed.addField(
                    `${category}`,
                    `\`${bot.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join('`, `')}\``
                );
            }

        }
        return message.channel.send(embed);

    } else {
        const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        if (!command) return message.reply("Commande introuvable");

        const embed = new MessageEmbed()
            .setColor('#bb1f1f')
            .setTitle(`\`${command.help.name}\``)
        if (command.help.aliases) embed.addField("Alias", `${command.help.aliases.join(', ')}`)
        embed.addField("Description", `${command.help.descriptionFr}`)
        embed.addField("Cooldown", command.help.cooldown ? `${command.help.cooldown} secondes` : `1 seconde`)
        embed.addField("Utilisation", command.help.usageFr ? `${prefix}${command.help.name} ${command.help.usageFr}` : `${prefix}${command.help.name}`, true)

        return message.channel.send(embed);
    }
};

module.exports.help = COMMANDS.MISC.HELP;