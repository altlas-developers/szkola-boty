const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "The help command, what do you expect?",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('Podaj tekst jaki chcesz przekształcić');
        //Sort your commands into categories, and make seperate embeds for each category

        const own = new Discord.MessageEmbed()
        .setColor("#6bec0f")
        .setDescription(args.join(" "))
        

        message.channel.send(own);
    
    }
}