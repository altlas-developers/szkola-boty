const Discord = require("discord.js");

module.exports = {
  name: "staty-serwera",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("Informacje o serwerze")
.setColor("#2c78ad")
.addField("Nazwa serwera", message.guild.name)
.addField("Właściciel", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Liczba kanałów", message.guild.channels.cache.size, true)
.addField("Role", message.guild.roles.cache.size, true)
.addField("Data utworzenia serwera", message.guild.createdAt)
.addField("Dołączono na serwer ", message.member.joinedAt)
.addField("Całkowita liczba użytkowników", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send(serverembed);
}
};