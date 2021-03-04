const bot = require("./komorebi"),
    dotenv = require('dotenv');

dotenv.config();

bot(process.env.BOT_TOKEN);