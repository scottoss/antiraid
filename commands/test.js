const Discord = require("discord.js");
const client = require('./../index.js');

const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               if (premium.guilds.includes(message.guild.cache.id)) {
                 message.channel.send('pong');
               } else if (premium.users.includes(message.user.cache.id)) {
                 message.channel.send('pong');
               } else {
                 message.channel.send('u need premium');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
