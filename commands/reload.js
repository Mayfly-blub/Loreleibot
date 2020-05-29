const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {

    if(message.author.id != "640524374750920725") return message.channel.send(" GET AWAY!!! YOU ARE NOT MY TRUE MASTER!!! ")

    if(!args[0]) return message.channel.send("Please provide a command to reload")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] //usage: !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded`)
}


module.exports.config = {
    name: "reload",
    noalias:"No Aliases",
    description: "reloads a bot command",
    usage:"!reload",
    Accessibleby: "Bot Owner",
    aliases: []
}