const Discord = require("discord.js");
const premium = require('./../premium.json')

code = {
  message.channel.send('pong');
}


module.exports.run = async (bot, message, args) => {
               message.channel.send('pong');
}

module.exports.help = {
  name:"ping"
}
