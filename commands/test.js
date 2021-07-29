const Discord = require("discord.js");
const premium = require('./../premium.json')
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });



module.exports.run = async (bot, message, args) => {
               var server = client.guilds.get(message.guild.id).id;
               user = message.user.id
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
