const {COMMANDS} = require("../../util/HELP");

module.exports.run = async (bot, message, args) => {

    const content = message.content.split(" ").slice(1).join(" ");
    const result = new Promise(async (resolve) => resolve(eval(content)));

    return result.then(async (output) => {
        if (typeof output !== "string") {
            output = require("util").inspect(output, {
                depth: 0
            });
        }
        if (output.includes(bot.token)) {
            output = output.replace(bot.token, "T0K3N");
        }
        await message.channel.send(output, {
            code: "js"
        });
    }).catch((err) => {
        err = err.toString();
        if (err.includes(bot.token)) {
            err = err.replace(bot.token, "T0K3N");
        }
        message.channel.send(err, {
            code: "js"
        });
        console.log(err)
    });

}

module.exports.help = COMMANDS.DEVELOPPER.EVAL;