const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    let msg = await message.channel.send("Generating...")

    let { body } = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
    console.log(body.message)
    if (!{ body }) return message.channel.send("I broke! Try again.")

    let dEmbed = new Discord.RichEmbed()
        .setColor(colours.pink)
        .setAuthor(`Loraleibot DOGS!`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
    message.channel.send({ embed: dEmbed })

    msg.delete();
}


module.exports.config = {
    name: "dog",
    noalias:"No Aliases",
    description: "Sends a picture of a dog",
    usage:"!dog",
    Accessibleby: "Members",
    aliases: []
}