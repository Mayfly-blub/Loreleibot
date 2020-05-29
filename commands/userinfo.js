const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    if (!blub[1]) {
        let uEmbed = new Discord.RichEmbed()
            .setColor(colours.pink)
            .setTitle("UserInfo")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.author.username} info`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**Status:**", `${message.author.presence.status}`, true)
            .addField("**Created At:**", `${message.author.createdAt}`, true)
            .setTimestamp()
            .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
        message.channel.send({ embed: uEmbed });
    } else {
        if (blub[1] = message.mentions.users.first()) {
            const taggeduser = message.mentions.users.first()
            let uEmbed = new Discord.RichEmbed()
                .setColor(colours.pink)
                .setTitle("UserInfo")
                .setThumbnail(message.guild.iconURL)
                .setAuthor(`${taggeduser.username} info`, taggeduser.displayAvatarURL)
                .addField("**Username:**", `${taggeduser.username}`, true)
                .addField("**Discriminator:**", `${taggeduser.discriminator}`, true)
                .addField("**ID:**", `${taggeduser.id}`, true)
                .addField("**Status:**", `${taggeduser.presence.status}`, true)
                .addField("**Created At:**", `${taggeduser.createdAt}`, true)
                .setTimestamp()
                .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
            message.channel.send({ embed: uEmbed });
        } else {
            let uEmbed = new Discord.RichEmbed()
                .setColor(colours.pink)
                .setTitle("UserInfo")
                .setThumbnail(message.guild.iconURL)
                .setAuthor(`${message.author.username} info`, message.author.displayAvatarURL)
                .addField("**Username:**", `${message.author.username}`, true)
                .addField("**Discriminator:**", `${message.author.discriminator}`, true)
                .addField("**ID:**", `${message.author.id}`, true)
                .addField("**Status:**", `${message.author.presence.status}`, true)
                .addField("**Created At:**", `${message.author.createdAt}`, true)
                .setTimestamp()
                .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
            message.channel.send({ embed: uEmbed });
        }
    }
}


module.exports.config = {
    name: "userinfo",
    description: "Pulls the user info of yourself or a user",
    usage: "!userinfo (@mention), !userinfo ",
    Accessibleby: "Members",
    aliases: ["ui", "userinformation"]
}