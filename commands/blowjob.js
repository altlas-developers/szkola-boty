const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "blowjob",
    category: "extra",
    run: async (client, message, args) => {
        const url = 'https://nekos.life/api/v2/img/blowjob';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Some porn for simps: `)
            .setColor('RANDOM')
            .setImage(data.url)

        await message.channel.send(embed)
    }
}