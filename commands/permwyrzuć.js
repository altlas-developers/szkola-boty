const Discord = require('discord.js');

module.exports = {
    name: "permwyrzuć",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Nie możesz tego użyć')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Nie mam uprawnień, aby wykonywać podanej czynności')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Podaj użytkownika jakiego chcesz wyrzucić');

        if(!member) return message.channel.send('Nie odnaleziono podannego użytkownika :/');
        if(!member.bannable) return message.channel.send('Nie mogę wyrzucic tego użytkownika gdyż ma wyższe permisje ode mnie');
        if(member.id === message.author.id) return message.channel.send('Nie możesz wyrzucic samego siebie');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Nie podano powodu';

        member.ban(`${reason}`)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })

        const banembed = new Discord.MessageEmbed()
        .setColor("#7bec17")
        .setTitle('✅||Wyrzucono użytkownika pomyślnie')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Wyrzucony Użytkownik', member)
        .addField('Wyrzucony przez?', message.author)
        .addField('Powód Wyrzucenia', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}