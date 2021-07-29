const Discord = require("discord.js");
const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               code = { message.channel.send('guild has premium'); }
               if (premium.guilds.includes(message.guild.id)) {
                 code
               } else if (premium.users.includes(message.author.id)) {
                 code
               } else {
                 message.channel.send('u need premium');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
