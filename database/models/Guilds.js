module.exports = async (Sequelize, db, bot) => {
    try {
        db.define('guilds', {
                guildID: {
                    type: Sequelize.STRING(25),
                    allowNull: false
                },
                prefix: {
                    type: Sequelize.STRING(10),
                    defaultValue: bot.config.setting.prefix,
                },
                enable_msg_log: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                msg_log_chan: {
                    type: Sequelize.STRING(25),
                    allowNull: true
                },
                enable_mod_log: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                mod_log_chan: {
                    type: Sequelize.STRING(25),
                    allowNull: true
                },
                enable_welcome: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                welcome_chan: {
                    type: Sequelize.STRING(25),
                    allowNull: true
                }
            },
            {
                timestamps: false
            });
        return db.models;

    } catch (error) {
        console.log(error);
    }
}
