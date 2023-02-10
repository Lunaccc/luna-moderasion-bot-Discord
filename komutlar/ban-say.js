const Discord = require("discord.js");

exports.run = (client, message, args) => {

  message.guild.channel.send
    .fetchBans()
    .then(ta =>
    message.channel.send(
        new Discord.MessageEmbed()
        .setTitle("| Bansay Sistem |")
        .setDescription(` Sunucunuzda ${ta.size} banlanmış üye bulunmaktadır.`)
    )
  )
    .catch(console.error)
    .then(m => m.delete({timeout: 5000}));
};

exports.conf = {
  enabled: true,
  runIn: ["bansay"],
  aliases: ["ban-say"],
  permLevel: 2
};

exports.help = {
  name: "bansay",
  description: "Sunucudan banlanan kişilerin sayısını gösterir",
  usage: "bansay"
};