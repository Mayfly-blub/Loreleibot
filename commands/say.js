const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    //put commands here
}


module.exports.config = {
    name: "say",
    description: " Command Description",
    usage:"how to use the command",
    Accessibleby: "Members",
    aliases: ["acc", "announcement"]
}