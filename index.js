const Discord = require("discord.js");
const discord = require("discord.js");
const fs = require('fs');
const config = require("./cfg.json");
const cfg = require("./cfg.json");
const prefix = cfg.prefix;
const blacklist = require('./blacklist.json')




const token = cfg.token;
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });
const { MessageEmbed } = require("discord.js")
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 8, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 1000000, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 10000, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 60000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming, or i will take action!!!!', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 5, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 1000000, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 8000000000000000, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: [], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredMembers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: false // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});



client.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });

});


client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    client.user.setActivity(`Protecting: ${client.guilds.cache.size} servers | r!help`);
})

//removed from a server
client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    client.user.setActivity(`Protecting: ${client.guilds.cache.size} servers | r!help`);
})


//client.on('message', (message) => antiSpam.message(message)); 
//Playing Message
client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

  client.user.setActivity(`Protecting: ${client.guilds.cache.size} servers | r!help`);
});


client.on("guildMemberAdd", (member) => {
    if (blacklist.banned.includes(member.id)) { member.ban({reason: 'this user is blacklisted!!!'}) }
});

client.on("ready", async () => {
  const array = (blacklist.banned);
  array.forEach(element => client.guilds.cache.forEach(a => a.members.ban(element)));
});

//Command Manager
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  //Check for prefix
  if(!cmd.startsWith(config.prefix)) return;
  
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    };
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    if (message.deletable) {
        try {await message.delete()} catch (err) {}
    }
    try {
        client.commands.get(command).execute(message, args);
    } catch(err) {
        console.log(`[${command.toUpperCase()}-ERROR] Unable to run command due to error: ${err}`)
    }

})

client.on("guildMemberAdd", async member => {
    if (member.user.username.startsWith("【ＣＧ】")) {
        try {await member.send("You have been banned from "+member.guild.name+" due to being a Chaos Gang member")} catch (err) {}
        await member.ban({reason:"Chaos Gang Member"})
    } 
    if (member.user.bot) {
        if (!member.user.flags.has(discord.UserFlags.FLAGS.VERIFIED_BOT)) {
            await member.ban({reason:"Non verified bot."})
            await member.guild.fetchAuditLogs({limit:1, type:"BOT_ADD"})
            .then(async audit => {
                first_log = audit.entries.first();
                const {executor, target} = first_log;
                try {
                    await member.guild.members.cache.get(executor.id).ban({reason:"Added a unverified bot."})
                } catch(err) {console.log(err)}

            })

        }
    }
})


client.on('message', message => {
if(message.content === "r!help") {
let embed = new MessageEmbed()
.setTitle("Command List")
.setDescription("r!help, r!ping, r!userinfo. r!lockdown on/off, r!ban, r!report")

.setColor("RANDOM")
message.channel.send(embed)
}
})


client.on('message', message => {
if(message.content === "fuck you") {
let embed = new MessageEmbed()
.setTitle("no fuck YOU")
.setColor("RANDOM")
message.channel.send(embed)
}
})


client.on('message', message => {
if(message.content === "kill myself") {
let embed = new MessageEmbed()
.setTitle("NOOOOOOOO please dont!!!!!")
.setDescription("please call The National Suicide Prevention Lifeline 1-800-273-8255")
.setColor("RANDOM")
message.channel.send(embed)
}
})

client.on('message', message => {
if(message.content === "suicide") {
let embed = new MessageEmbed()
.setTitle("Suicide is not funny!!!!")
.setDescription("if u are thinking to kill yourself please visit this site: https://www.fcc.gov/suicide-prevention-hotline")
.setColor("RANDOM")
message.channel.send(embed)
}
})


client.login(process.env.TOKEN)
.catch(err => {
    console.log(`[LOGIN-ERROR] ${err}`);
})
