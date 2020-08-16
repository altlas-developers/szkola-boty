const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "gifhentai",
    category: "extra",
    run: async (client, message, args) => {
        const url = 'https://nekos.life/api/v2/img/Random_hentai_gif';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Some gif for simps: `)
            .setColor('RANDOM')
            .setImage(data.url)

        await message.channel.send(embed)
    }
}