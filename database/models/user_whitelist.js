module.exports = async (Sequelize, db, uid) => {
    try {
        db.define('user_whitelist', {
                userID: {
                    type: Sequelize.STRING(25),
                    allowNull: false
                },
                whitelist: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
            },
            {
                timestamps: false
            });
        return db.models;

    } catch (error) {
        console.log(error);
    }
}