const { Collection } = require("discord.js");

module.exports = async (bot, message) => {
    if (!message.content.startsWith(bot.config.setting.prefix) || message.author.bot) return;

    const args = message.content.slice(bot.config.setting.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //aliases
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;

    //Check if it's owner/dev command
    if(command.help.auth === "owner" && !bot.config.auth.owner.includes(message.author.id)){
        return message.channel.send("You can't use that command");
    } else if (command.help.auth === "dev" && !bot.config.auth.developper.includes(message.author.id)){
        return message.channel.send("You can't use that command");
    }

    //Check if args needed
    if (command.help.args === "true" && !args.length){
        let noArgsReply = `Cette commande nécessite un argument.`;

        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${bot.config.setting.prefix}${command.help.name} ${command.help.usage}\``

        return message.channel.send(noArgsReply);
    } else if (command.help.args === "false" && args.length) {
        let noArgsReply = `Cette commande ne nécessite pas d'argument. \nVoici comment utiliser la commande : \`${bot.config.setting.prefix}${command.help.name}\``;

        return message.channel.send(noArgsReply);
    }

    //Cooldown
    if (!bot.cooldowns.has(command.help.name)) {
        bot.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now()
    const tStamps = bot.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 1) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if(timeNow < cdExpirationTime){
            timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`merci d'attendre ${timeLeft.toFixed(0)}s avant de réutiliser la commande \`${command.help.name}\`.`);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    //DataBase guild search
    // LATER

    command.run(bot, message, args);
}