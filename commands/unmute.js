const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]) || !message.guild.owner) return message.channel.send("Ahh, GET AWAY! You ain\'t my onii-chan.");

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don\'t have permission to add roles")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("You gotta tell me who you want to be muted onii-chan");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    let muterole = message.guild.roles.find(r =>r.name === "Muted")
    if(!muterole) return message.channel,send("There is no mute role to remove baka onii-chan!!")

    mutee.removeRole(muterole.id).then(() => {
        message.delete()
        mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`${mutee.user.username} was unmuted!`)
    })

    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unmute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Date:", message.createdAt)

    let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs")
    sChannel.send(embed)
}


module.exports.config = {
    name: "unmute",
    description: "unmutes a member in the server",
    usage:"!unmute (member) (reason)",
    Accessibleby: "Administrators",
    aliases: ["unm"]
}