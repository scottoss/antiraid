const Discord = require("discord.js");
const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               
               if (premium.guilds.includes(message.guild.id)) {
                 message.channel.send('guild has premium'); 
               } else if (premium.users.includes(message.author.id)) {
                 message.channel.send('user has premium'); 
               } else {
                 message.channel.send('u need premium to run this command!!!');
               }
             }
  
  

module.exports.help = {
  name:"test"
}
