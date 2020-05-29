const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    if(message.author.id != "640524374750920725") return message.channel.send(" GET AWAY!!! YOU ARE NOT MY TRUE MASTER!!! ")
    try  {
        await message.channel.send("Loralei is going to sleep now...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
}


module.exports.config = {
    name: "shutdown",
    noalias:"No Aliases",
    description: " shutdown the bot",
    usage:"!shutdown",
    Accessibleby: "Bot owner",
    aliases: []
}