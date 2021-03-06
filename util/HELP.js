const COMMANDS = {
    ADMINISTRATOR: {
        SETWELCOMECHANNEL:{
            name: "setWelcomeChannel",
            aliases: ["setwc"],
            category: "administrator",
            descriptionEn: "set the welcome channel",
            descriptionFr: "Définir le salon de bienvenue",
            usageEn: "<channel-id>",
            usageFr: "<id-salon>",
            cooldown: 10,
            permissions: "",
            auth: "owner",
            args: "true"
        },
    },
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
        EVAL: {
            name:"eval",
            category: "developper",
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
            category: "developper",
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
            category: "developper",
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
    MODERATION: {
        BAN: {
            name: "ban",
            aliases: [],
            category: "moderation",
            descriptionEn: "ban a user",
            descriptionFr: "bannir un utilisateur",
            usageEn: "<user>",
            usageFr: "<utilisateur>",
            cooldown: 0,
            permissions: "",
            auth: "",
            args: "true"
        },
        KICK: {
            name: "kick",
            aliases: [],
            category: "moderation",
            descriptionEn: "kick a user",
            descriptionFr: "expulser un utilisateur",
            usageEn: "<user>",
            usageFr: "<utilisateur>",
            cooldown: 0,
            permissions: "",
            auth: "",
            args: "true"
        },
        UNBAN: {
            name: "unban",
            aliases: [],
            category: "moderation",
            descriptionEn: "unban a user",
            descriptionFr: "débannir un utilisateur",
            usageEn: "<user>",
            usageFr: "<utilisateur>",
            cooldown: 0,
            permissions: "",
            auth: "",
            args: "true"
        }
    },
}

module.exports.COMMANDS = COMMANDS;