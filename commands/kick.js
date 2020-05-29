const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    const user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.guild.owner) return message.channel.send("Ahh, GET AWAY! You ain\'t my onii-chan.")

    let kickmember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!kickmember) return message.channel.send("How am i suppose to know who to explode if you don\'t specify, baka onii-chan")
    
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don\'t have permission to do what was asked")
    kickmember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`)


    if(kickmember) {
        message.channel.sendMessage('**EXPLOSION**')
        kickmember.kick().then(() =>

        message.channel.send(`Praise me onii-chan~, i successfully exploded the baddie known as ${kickmember.user.tag}`)).catch(err => {
            message.reply('Ahhh, this baddie managed to survive my explosion magic unscathed')
        console.log(err)})

    } else {
    message.channel.send(`Praise me onii-chan~, i successfully exploded the baddie known as ${kickmember.user.tag}`)
    }
    
    
    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("Victim:", kickmember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt)

    let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs")
    sChannel.send(embed)
}


module.exports.config = {
    name: "kick",
    description: "allows you to kick a member of the server",
    usage: "!kick (@mention)",
    Accessibleby: "Administrators",
    aliases: ["explode", "k"]
}