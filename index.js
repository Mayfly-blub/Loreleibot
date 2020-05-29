const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colours = require("./colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });

require("./util/eventHandler")(bot)


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js" )
    if(jsfile.length <= 0) {
       return console.log("[LOGS] couldnt find Commands")
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })

    })
});


bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm");

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let blub = message.content.substring(prefix.length).split(" ");
    
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args,blub)

})


bot.login(botconfig.token);