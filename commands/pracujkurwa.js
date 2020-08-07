const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js')
module.exports = {
    name: "pracuj",
    description: "Work your a** off",

    async run (client, message, args) {
        let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            const errwork = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setAuthor( message.author.tag, message.author.avatarURL())
            .setDescription(`Już za długo popracowałeś. Twoja przerwa trwa ${time.minutes } minut i  ${time.seconds} sekund`)


            return message.channel.send(errwork)
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())
            const work = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`Tyle pracowałeś, że zarobiłeś ponad ${amount} złoty! `)


            message.channel.send(work)
        }
    }
}