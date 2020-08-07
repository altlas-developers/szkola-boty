const Discord = require('discord.js');

const db = require('quick.db')

module.exports = {
    name: "wyrzuć",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Nie możesz tego użyć')
        if(!message.guild.me.hasPermission("ADMINISTATOR")) return message.channel.send('Nie mam uprawnień, aby wykonywać podanej czynności')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Podaj użytkownika jakiego chcesz wyrzucić');

        if(!member) return message.channel.send('Nie odnaleziono podannego użytkownika :/');
        if(!member.kickable) return message.channel.send('Nie mogę wyrzucic tego użytkownika gdyż ma wyższe permisje ode mnie');

        if(member.id === message.author.id) return message.channel.send('Nie możesz wyrzucic samego siebie');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Nie podano powodu';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Wystapił nieoczekiwany błąd z botem. Prawdopodobnie może to być problem z skryptem bota')
        })

        const kickembed = new Discord.MessageEmbed()
        .setColor("#7bec17")
        .setTitle('✅||Wyrzucono użytkownika pomyślnie')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Wyrzucony Użytkownik', member)
        .addField('Wyrzucony przez kogo?', message.author)
        .addField('Powod Wyrzucenia', reason)
        .setTimestamp()

        message.channel.send(kickembed);
    }
}