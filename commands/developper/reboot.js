const {COMMANDS} = require("../../util/HELP");
const dotenv = require('dotenv')
dotenv.config();

module.exports.run = async (bot, message, args) => {
    message.reply("Redémarrage...");
    console.log("[ ! ] Rebooting [ ! ]");
    bot.destroy();
    await bot.login(process.env.BOT_TOKEN);
    console.log("[ ! ] success [ ! ]");
    message.channel.send("Redémarrage terminé")

}

module.exports.help = COMMANDS.DEVELOPPER.REBOOT;