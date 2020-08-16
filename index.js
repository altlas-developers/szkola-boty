const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

const Canvas = require('canvas');

const config = require('./config.json');
client.config = config;





client.commands= new Discord.Collection();
//You can change the prefix if you like. It doesn't have to be ! or ;
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    function randomStatus() {
        let status = ["s!pomoc - spis wszystkich komend", `Jestem na 1 serwerze`, `Użytkownicy ${client.users.cache.size}`, "I ten mały karakan...", "Why are yuo gae"] // You can change it whatever you want.
        let rstatus = Math.floor(Math.random() * status.length);
        
        client.user.setActivity(status[rstatus], {type: "STREAMING", url: "https://www.twitch.tv/pietruchaoficjalna"});
      }; setInterval(randomStatus, 30000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.
});


client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '😊¦¦witamy¦¦😊');
    if (!channel) return;
    
    const welcome = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Witaj na serwerze  ${member}! cieszymy sie,  że jesteś. Najpierw przeczytaj regulamin, aby nie dostać bana`)


	channel.send(welcome);
});

client.on('guildMemberRemove', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '😊¦¦witamy¦¦😊');
    if (!channel) return;
    
    const zegnaj = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Oh nie! ${member} wyszedł ze serwera 😭! Mamy nadzieje że do nas wrócisz`)


	channel.send(zegnaj);
});



let stats = {
    serverID: '<ID>',
    total: "<ID>",
    member: "<ID>",
    bots: "<ID>"
}



client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Liczba Wszystkich Uzytkowników: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Uzytkownicy: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Boty: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Liczba Wszystkich Uzytkowników: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Użytkownicy: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Boty: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

    
})

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    

    if(message.content.startsWith("s!")) {
        const args = message.content.slice("s!".length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token);