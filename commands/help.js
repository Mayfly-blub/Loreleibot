const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");
const cheerio = require("cheerio");
const request = require("request");
const prefix = botconfig.prefix

const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async (bot, message, args, blub) => {

    if (args[0] == "help") return message.channel.send(`Just do ${prefix}help instead`)

    if (args[0]) {
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
                .setColor(colours.pink)
                .setAuthor(`Loraleibot HELP`, message.guild.iconURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed)
        }
    }

    if (!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
            .setAuthor(`Help Command!`, message.guild.iconURL)
            .setColor(colours.pink)
            .setDescription(`${message.author.username} check your dms!`)

        let Sembed = new Discord.RichEmbed()
            .setColor(colours.pink)
            .setAuthor(`Loraleibot Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`These are the available commands for Loraleibot!\nThe bot prefix is: ${prefix}`)
            .addField(`Commands:`, "``dog`` ``userinfo`` ``serverinfo`` ``bite`` ``cuddle`` ``hug`` ``kiss`` ``lick`` ``pat`` ``poke`` ``punch`` ``slap`` ``stare`` ``kick`` ``mute`` ``unmute`` ``ban`` ``softban`` ``unban`` ")
            .setFooter("Loraleibot", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)

    }

}


module.exports.config = {
    name: "help",
    description: "The help command",
    usage:"!help {command}, !help",
    Accessibleby: "Members",
    aliases: ["h", "halp", "commands"]
}