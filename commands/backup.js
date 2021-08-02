const Discord = require("discord.js");
const premium = require('./../premium.json')




module.exports.run = async (bot, message, args) => {
               
 if (premium.guilds.includes(message.guild.id)) {
       if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'`! Use `'+config.prefix+'load-backup '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return message.channel.send(':x: An error occurred, please check if the bot is administrator!');

    });
 } else if (premium.users.includes(message.author.id)) {
       if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'`! Use `'+config.prefix+'load-backup '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return message.channel.send(':x: An error occurred, please check if the bot is administrator!');

    });
 } else {
   
 }
}
  
  

module.exports.help = {
  name:"backup"
}
