const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.pink)
        .setTitle("ServerInfo")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count**:", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setTimestamp()
        .setFooter(`Loraleibot `, bot.user.displayAvatarURL);
    message.channel.send({ embed: sEmbed });
}


module.exports.config = {
    name: "serverinfo",
    description: "Pulls the server info",
    usage:"!serverinfo (@mention), !serverinfo ",
    Accessibleby: "Members",
    aliases: ["si", "serverinformation", "serverdesc"]
}