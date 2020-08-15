const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    category: "extra",
    run: async (client, message, args) => {
        const url = 'https://memapi.glitch.me/';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Polski Rodzinny Memeszek :) 🐛: `)
            .setDescription(data.title)
            .setColor('RANDOM')
            .setImage(data.zdj)

        await message.channel.send(embed)
    }
}