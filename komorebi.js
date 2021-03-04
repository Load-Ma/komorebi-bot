const { Client, Collection } = require('discord.js'),
    SelfReloadJSON = require('self-reload-json'),
    { readdirSync, readdir} = require('fs'),
    {Sequelize} = require('sequelize'),
    sequelize = require('./database/DB_connect');

class Komorebi extends Client {

    constructor(token) {
        super();
        this.token = token;
        this.config = new SelfReloadJSON(`${__dirname}/config.json`);
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.db = sequelize;
        this.launch();
    }

    async loadCommands(){
        const dir = `${__dirname}/commands/`
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

            for (const file of commands) {
                const getFileName = require(`${dir}/${dirs}/${file}`);
                this.commands.set(getFileName.help.name, getFileName);
                console.log(`Command loaded : ${getFileName.help.name}`);
            }
        });
    };

    async loadEvents(dir = __dirname+"/events/"){
        readdirSync(dir).forEach(dirs => {
            const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

            for (const event of events) {
                if (dirs == "client") {
                    const evt = require(`${dir}/${dirs}/${event}`);
                    const evtName = event.split(".")[0];
                    this.on(evtName, evt.bind(null, this));
                    console.log(`Event loaded : ${evtName}`);
                }

            }
        });
    };

    async loadModels(){
        const mdlFiles = `${__dirname}/database/models`;
        readdir(mdlFiles, (err, files) => {
            if (err) return console.log(err);
            const models = files.filter((c) => c.split('.').pop() === 'js');
            if (files.length === 0 || models.length === 0) throw new Error('Aucun model n\'a été trouvée !');
            this.db.authenticate().then(async () => {
                for (let i = 0; i < models.length; i++){
                    await require(`${mdlFiles}/${models[i]}`)(Sequelize, this.db, this);
                    console.log(`Model loaded -> ${models[i]}`);
                }
                await this.db.sync({
                    alter: true,
                    force: false
                })
            }).catch(async (err) => {
                console.log(err);
            })
        })
    };

    launch() {
        this.loadCommands();
        this.loadEvents();
        this.loadModels();
        this.login(this.token);
    };

}

module.exports = (token) => new Komorebi(token, {
    disableEveryone: true,
    fetchAllMembers: true
});
