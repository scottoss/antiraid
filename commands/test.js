const Discord = require("discord.js");
const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               
               if (premium.users.includes(message.author.id)) {
                 message.channel.send('pong');
               } else {
                 message.channel.send('u need premium');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
