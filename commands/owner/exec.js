const Discord = require("discord.js");
const { COMMANDS } = require("../../util/HELP");
const { exec } = require("child_process");

module.exports.run = async (bot, message, args) => {

    let messageArray = message.content.split(" ");
        let command = args.join(" ")
        exec(`${command}`, (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`error: ${error.message}`);
                console.log(`\`ERROR!\` \n \`\`${error.message}\`\``);
                return;
            }
            if (stderr) {
                message.channel.send(`\`\`\`${stderr}\`\`\``);
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`\`\`\`${stdout}\`\`\``);
        });
}

module.exports.help = COMMANDS.OWNER.EXEC;