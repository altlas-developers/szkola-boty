const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "nosacz",
    category: "extra",
    run: async (client, message, args) => {
const url = 'http://szprinktrap.ddns.net:1410/kurla.json';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Kuuurłaa kiedyś to byłło nie to co teraz 🙈 `)
            .setColor('RANDOM')
            .setImage(data.file)

        await message.channel.send(embed)
    }
}