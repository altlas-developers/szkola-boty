const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
 module.exports = {
     name: "ruletka",
     description: "ruletka",
     async run (client, message, args) {
        const amount = parseInt(args[0]);
        const result = Math.floor(Math.random() * 10);
        const balance = db.get(`account.${message.author.id}.balance`);
    
        if (!amount) return message.channel.send("Podaj ilość pieniędzy jakich chcesz obstawić");
        if (isNaN(amount)) return message.channel.send("Podaj ILE chcesz pieniędzy obstawić");
        if (amount > balance || !balance || balance === 0) return message.channel.send("Nie masz wystarczająco złotówek");
        
        // Optional:
        if (amount < 200) return message.channel.send(" Minimalną wartością do grania w ruletkę jest 200 PLN.");
    
        let cooldown = 25000; // 25 Seconds.
        let pad_zero = num => (num < 10 ? '0' : '') + num;
        let lastGamble = await db.get(`lastGamble.${message.author.id}`);
    
        if (lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastGamble));
            let second = pad_zero(timeObj.seconds).padStart(2, "0");
            const czaserr = new Discord.MessageEmbed()
            .setColor("#e24420")
            .setDescription(`Poczekaj. Aby użyć komendy ponownie poczekaj  **${second}** sekund(y)`)
            .setTimestamp()
            return message.channel.send(czaserr);
        }
    
        // 50:50
        if (result < 5) {
            await db.set(`lastGamble.${message.author.id}`, Date.now());
            await db.subtract(`account.${message.author.id}.balance`, amount);
            const przegrana = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setDescription(`Oh Nie,Prezgrałeś ${amount} PLN . Następnym Razem ci się uda`)
            .setTimestamp()
            return message.channel.send(przegrana);
        } else if (result > 5) {
            await db.set(`lastGamble.${message.author.id}`, Date.now());
            await db.add(`account.${message.author.id}.balance`, amount);
            const wygrana = new Discord.MessageEmbed()
            .setColor("#2fa21a")
            .setDescription(`Woohoo! Wygrałeś $${amount} PLN! Gratulujemy wygranej`)

            return message.channel.send(wygrana);
        }
    }
 }
