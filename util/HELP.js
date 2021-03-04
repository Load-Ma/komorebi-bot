const COMMANDS = {
    DEVELOPPER: {
        PING: {
            name: "ping",
            aliases: ["ckeck"],
            category: "developper",
            descriptionEn: "check if bot is online",
            descriptionFr: "Vérifier que le bot est en ligne",
            usageEn: "",
            usageFr: "",
            cooldown: 10,
            permissions: "",
            auth: "owner",
            args: "false"
        },
    },
    MISC: {
        HELP: {
            name: "help",
            aliases: ["h"],
            category: "misc",
            descriptionEn: "Show all commands",
            descriptionFr: "Montre la liste des commandes",
            usageEn: "[command_name]",
            usageFr: "[nom_commande]",
            cooldown: 0,
            permissions: "",
            auth: "",
            args: "none"
        }
    },
    OWNER: {
        EVAL: {
            name:"eval",
            category: "owner",
            descriptionEn: "Execute JavaScript with bot",
            descriptionFr: "Exécuter du JavaScript depuis le bot",
            usageEn: "<JS lines>",
            usageFr: "<lignes de JS>",
            permissions: "",
            cooldown: 3,
            auth: "dev",
            args: "true"
        },
        EXEC: {
            name:"exec",
            aliases:['execute'],
            category: "owner",
            descriptionEn: "Execute Linux commands from the bot",
            descriptionFr: "Executer des commandes Linux depuis le bot",
            usageEn: "<linux command>",
            usageFr: "<commande linux>",
            permissions: "",
            cooldown: 3,
            auth: "dev",
            args: "true"
        },
        RELOAD: {
            name: "reload",
            aliases: ["rl"],
            category: "owner",
            descriptionEn: "Reload a command",
            descriptionFr: "Reload une commande",
            usageEn: "<command>",
            usageFr: "<commande>",
            permissions: "",
            cooldown: 3,
            auth: "dev",
            args: "true"
        },
    },
}

module.exports.COMMANDS = COMMANDS;