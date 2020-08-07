const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "ostrzeżenie",
    description: "Warn a member",

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('Nie możesz użyć tej komendy');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Podaj nazwe użytkownika lub jego id');

        if(user.bot) return message.channel.send('Nie możesz nadać ostrzeżenia botowi');

        if(message.author.id === user.id) return message.channel.send('Nie możesz sam siobie nadać ostrzeżenia');

        if(message.guild.owner.id === user.id) return message.channel.send('Nie mozesz nadać ostrzeżenia właścicielowi');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Nie podano powodu';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3) return message.channel.send(`${user} przekroczył liczbe 3 ostrzeżeń`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`Nadano ci ostrzeżenie na serwerze ${message.guild.name} za : \`${reason}\``)
            await message.channel.send(`**${user.username}** nadano ostrzeżenie`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`Nadano ci ostzreżenie na serwerze ${message.guild.name} za: \`${reason}\``)
            await message.channel.send(`**${user.username}** nadano ostrzeżenie`)
        }
    }
}