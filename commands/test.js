const Discord = require("discord.js");
const premium = require('./../premium.json')


server = message.guild.id,
user = message.user.id
module.exports.run = async (bot, message, args) => {
               if (premium.guilds.includes(server)) {
                 message.channel.send('pong');
               } else if (premium.users.includes(user)) {
                 message.channel.send('pong');
               } else {
                 message.channel.send('u need premium');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
