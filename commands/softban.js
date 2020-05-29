const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Ahh, GET AWAY! You ain\'t my onii-chan.")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("How am i suppose to know who to temporarily get rid of if you don\'t specify, baka onii-chan")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don\'t have permission to add roles")

    message.delete()

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
    banMember.ban(banMember, {days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => consolde.log(err))

    message.channel.send(`Praise me onii-chan~, i managed to temporarily teleport the baddie known as ${banMember.user.tag} from the server`)
    
    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "softban")
    .addField("Victim:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt)

    let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs")
    sChannel.send(embed)
}


module.exports.config = {
    name: "softban",
    description: "allows you to ban a user from the server",
    usage:"!softban (@mention)",
    Accessibleby: "Administrators",
    aliases: ["teleport", "sb"]
}