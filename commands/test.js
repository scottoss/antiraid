const Discord = require("discord.js");
const client = require('./../index.js');

const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               var server = client.guilds.cache.get(message.guild.id).id;
               if (premium.guilds.includes(server)) {
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
