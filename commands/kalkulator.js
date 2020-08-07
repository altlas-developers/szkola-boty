const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "kalkulator",
    description: "Get the answer to a math problem",


    async run (client, message, args){

        if(!args[0]) return message.channel.send('Podaj równanie jakie chcesz rozwiązać');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Podaj  **PRAWIDŁOWE** równanie')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Kalkulator')
        .addField('Równanie', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Wynik', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}