const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
        
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Ahh, GET AWAY! You ain\'t my onii-chan.")

    let bannedmember = await bot.fetchUser(args[0])
    if(!bannedmember) return message.channel.send("How am i suppose to know who to set free if you don\'t specify, baka onii-chan")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don\'t have permission to do things")

    message.delete()
    try{
        message.guild.unban(bannedmember, {reason: reason})
        message.channel.send(`${bannedmember.tag} has been set free from his banishment`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unban")
    .addField("Victim:", `${bannedmember.username} (${bannedmember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt)

    let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs")
    sChannel.send(embed)
}


module.exports.config = {
    name: "unban",
    description: "Allows you to unban a user",
    usage:" !unban (@mention)",
    Accessibleby: "Administrator",
    aliases: ["ub", "Unban", "release"]
}