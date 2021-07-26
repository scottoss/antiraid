const discord = require("discord.js");
const fs = require('fs');
const cfg = require("./cfg.json");
const prefix = cfg.prefix;
const token = cfg.token;
const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });


client.on("ready", () =>{
    console.log(`\nJSplitter session created successfully\n   bot: ${client.user.tag}\n   prefix: "${prefix}"`);
})

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


client.login(token)
.catch(err => {
    console.log(`[LOGIN-ERROR] ${err}`);
})
