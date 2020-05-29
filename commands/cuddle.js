const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "anime cuddle gifs",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }


        $ = cheerio.load(responseBody);


        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {

            return;
        }

        if (!blub[1]) {
            let hEmbed = new Discord.RichEmbed()
                .setColor(colours.pink)
                .setAuthor(`Loralei cuddles ${message.author.username}`)
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
            message.channel.send({ embed: hEmbed });
        } else {
            if (blub[1] = message.mentions.users.first()) {
                const taggeduser = message.mentions.users.first()
                let hEmbed = new Discord.RichEmbed()
                    .setColor(colours.pink)
                    .setAuthor(`${message.author.username} cuddles ${taggeduser.username}`)
                    .setImage(urls[Math.floor(Math.random() * urls.length)])
                    .setTimestamp()
                    .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
                message.channel.send({ embed: hEmbed });
            } else {
                let hEmbed = new Discord.RichEmbed()
                    .setColor(colours.pink)
                    .setAuthor(`Please tag someone!`)
                    .setTimestamp()
                    .setFooter(`Loraleibot `, bot.user.displayAvatarURL)
                message.channel.send({ embed: hEmbed });
            }
        }

    })
}


module.exports.config = {
    name: "cuddle",
    noalias:"No Aliases",
    description: " Allows you to cuddle another user or makes Loralei cuddle you",
    usage:"!cuddle (@mention), !cuddle",
    Accessibleby: "Members",
    aliases: []
}