module.exports = bot => {
    bot.user.setActivity(`${bot.users.cache.size} utilisateurs`);
    console.log(`${bot.user.tag} is online`);
    console.log(`${bot.users.cache.size} users`);
    console.log(`in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds`);
    console.log(``);
}