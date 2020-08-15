const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pikachu",
    category: "extra",
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/img/pikachu';

        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error has occured, try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Pikaczu!!!: `)
            .setColor('#ebdb0f')
            .setImage(data.link)

        await message.channel.send(embed)
    }
}