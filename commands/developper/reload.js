const { MessageEmbed } = require("discord.js");
const { COMMANDS } = require("../../util/HELP");

module.exports.run = async (bot, message, args) => {

    message.delete({timeout: 4000});
    const commandName = args[0]
    let command = bot.commands.get(commandName);
    if (!command) return message.channel.send("Commande introuvable.").then(m => m.delete({timeout: 5000}));

    try {
        delete require.cache[require.resolve(`../${command.help.category}/${command.help.name}`)];
        let props = require(`../${command.help.category}/${command.help.name}`);
        bot.commands.delete(props)
        props.help.category = command.help.category

        bot.commands.set(props.help.name, props)

        const reloadEmbed = new MessageEmbed()
            .setColor('#49FF00')
            .setDescription(`**${commandName}** command has been reloaded !`)
        message.channel.send(reloadEmbed).then(m => m.delete({timeout: 5000}));
        console.log(`${commandName} reloaded !`);
    } catch (error) {
        const reloadEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle("Error when reloading !")
            .addField("Error :", error)
        message.channel.send(reloadEmbed)
        console.log(error)
    }

}

module.exports.help = COMMANDS.DEVELOPPER.RELOAD;