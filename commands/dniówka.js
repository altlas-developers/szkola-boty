const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js')
module.exports = {
    name: "dniówka",
    description: "Receive a daily award of money",

    async run (client, message, args) {
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            const errecoembed = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setAuthor( message.author.tag, message.author.avatarURL())
            .setDescription(`Już odebrałeś swoją dniówke. Ponownie możesz to zrobić za  ${time.days} dni, ${time.hours} godziny/godzin/, ${time.minutes} minut/minute, i ${time.seconds} sekund/sekundę/sekundy`);


            return message.channel.send(errecoembed)
        } else {
            const dnembed = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setAuthor( message.author.tag, message.author.avatarURL())
            .setTitle("Dniówka")
            .setDescription(`Dodano do twojego konta ${amount} złoty`);
            
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            

            message.channel.send(dnembed)
        }
    }
}