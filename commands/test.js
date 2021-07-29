const Discord = require("discord.js");
const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               if (premium.guilds.includes(guild.id)) {
                 message.channel.send('pong');
               } else if (premium.users.includes(user.id)) {
                 message.channel.send('pong');
               } else {
                 message.channel.send('u need premium');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
