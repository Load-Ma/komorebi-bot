const { MessageEmbed } = require('discord.js');
const { COMMANDS } = require('../../util/HELP');
const moment = require('moment')

module.exports.run = async (bot, message, args) => {
    let user;

    const Badges = {
        DISCORD_EMPLOYEE: `<:discord_employee:818540137402597386>`,
        PARTNERED_SERVER_OWNER: '<:discord_partner:818540135763017788>',
        BUGHUNTER_LEVEL_1: '<:discord_BugHunter:818540134798196736>',
        BUGHUNTER_LEVEL_2: '<:discord_BugHunterLvl2:818540134802522173>',
        HYPESQUAD_EVENTS: '<:discord_hypesquad_events:818540137838542868>',
        HOUSE_BRAVERY: '<:discord_hypesquad_bravery:818540135297187861>',
        HOUSE_BRILLIANCE: '<:discord_hypesquad_briliance:818540135657504848>',
        HOUSE_BALANCE: '<:discord_hypesquad_balance:818540135556710400>',
        EARLY_SUPPORTER: '<:discord_earlysupporter:818540138090725396>',
        VERIFIED_BOT: '',
        EARLY_VERIFIED_BOT_DEVELOPER: '<:verified_developer_badge:818540135204520038>'
    };

    const PresenceStatus = {
        online: ':green_circle:',
        idle: ':orange_circle:',
        offline: ':white_circle:',
        dnd: ':red_circle:',
        invisible: ':white_circle:'
    }

    if (!args.length) {
        user = message.guild.members.cache.get(message.author.id);
    }
    else {
        try {
            user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        }
        catch (err) {
            return message.channel.send("Utilisateur introuvable")
        }
    }

    const userBadges = user.user.flags.toArray();
    const roles = user.roles.cache
        .sort((x, y) => y.position - x.position)
        .map(role => role.toString())
        .slice(0, -1);

    const userActivity = user.user.presence.activities[0]

    const userStatus = user.user.presence.status;
    let userStatusEmote;
    switch (userStatus){
        case "online":
            userStatusEmote = PresenceStatus["online"];
            break;
        case "dnd":
            userStatusEmote = PresenceStatus["dnd"];
            break;
        case "invisible":
            userStatusEmote = PresenceStatus["invisible"];
            break;
        case "idle":
            userStatusEmote = PresenceStatus["idle"];
            break;
        case "offline":
            userStatusEmote = PresenceStatus["offline"];
            break;
    }

    const UserEmbed = new MessageEmbed()
        // .setAuthor()
        .setTitle(`Informations de ${user.user.username}`)
        .setColor('#bb1f1f')
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        .setDescription('Voici toutes les informations relatives à l\'utilisateur')
        .addFields(
            {
                name: '\u200B',
                value: '**UTILISATEUR**'
            },
            {
                name: `Qui est-ce ?`,
                value: `${user.user.username}#${user.user.discriminator}\n${user.user.id}`,
                inline: true,
            },
            {
                name: `Date de création`,
                value: `${moment(user.user.createdTimestamp).format('L')}`,
                inline: true,
            },
            {
                name: `Status`,
                value: `${userStatusEmote}`,
                inline: true,
            },
            {
                name: `Badges`,
                value: `${userBadges.length ? userBadges.map(badge => Badges[badge]).join(', ') : 'Aucun'}`,
                inline: true,
            },
            {
                name: `Status personnalisé`,
                value: `${userActivity ? userActivity.state : "Aucune"}`,
                inline: true,
            },
            {
                name: '\u200B',
                value: '**MEMBRE**'
            },
            {
                name: `A rejoint le`,
                value: `${moment(user.joinedAt).format('LL LT')}`,
                inline: true,
            },
            {
                name: `Role masqué le plus important`,
                value: `${user.roles.highest.id === message.guild.id ? 'None' : user.roles.highest}`,
                inline: true,
            },
            {
                name: `Role visible le plus important`,
                value: `${user.roles.hoist ? user.roles.hoist : 'None'}`,
                inline: true,
            },
            {
                name: `Roles`,
                value: `${roles.length ? roles.length + ' : ' + roles.join(', ') : 'None'}`,
                inline: true,
            }
        )
        .setFooter(`demandé par ${message.author.username}`, `${message.author.avatarURL({dynamic: true})}`)
        .setTimestamp()
    await message.channel.send(UserEmbed);
};

module.exports.help = COMMANDS.MISC.USERINFO;


/*
Partie User

Partie Member
son/ses grade
*/