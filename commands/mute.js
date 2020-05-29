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
    if(!muterole) {
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#514f48",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        } catch(e) {
            console.log(e.stack);
        }
    }
    mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)

    if(mutee) {
        mutee.addRole(muterole.id).then(() =>

        message.channel.send(`Praise me onii-chan~, i successfully muted the baddie known as ${mutee.user.tag}`)).catch(err => {
            message.reply('Ahhh, this baddie managed to survive my mute magic unscathed')
        console.log(err)})

    } else {
    message.channel.send(`Praise me onii-chan~, i successfully exploded the baddie known as ${mutee.user.tag}`)
    }


    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Date:", message.createdAt)

    let sChannel = message.guild.channels.find(c => c.name === "lb-modlogs")
    sChannel.send(embed)
}


module.exports.config = {
    name: "mute",
    description: "mutes a member in the server",
    usage:"!mute (@mention) (reason)",
    Accessibleby: "Administrators",
    aliases: ["m", "nospeak", "stfu"]
}