const Discord = require("discord.js");
const discord = require("discord.js");
const fs = require('fs');
const config = require("./cfg.json");
const cfg = require("./cfg.json");
const prefix = cfg.prefix;
const token = cfg.token;
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });
const { MessageEmbed } = require("discord.js")
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

//Playing Message
client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

  client.user.setActivity('over unverified bots!! | r!help', {type: "WATCHING"});
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
.setDescription("r!help, r!ping, r!userinfo. r!lockdown on/off, r!ban")
.setColor("RANDOM")
message.channel.send(embed)
}
})



client.login(process.env.TOKEN)
.catch(err => {
    console.log(`[LOGIN-ERROR] ${err}`);
})
