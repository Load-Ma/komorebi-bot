const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: "mysql",
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false
    },
    pool: {
        max: 200,
        min: 0,
        acquire: 60000,
        idle: 10000
    },
    logging: false
});

module.exports = sequelize;