const Discord = require("discord.js")


module.exports = bot => {
    console.log(`${bot.user.username} has awoken from her slumber to play with all the onii-chans`)
    bot.user.setActivity("Imouto Simulator", { type: "PLAYING" });    
}