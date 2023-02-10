const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let Channel = message.mentions.channels.first();
  let Log = db.fetch("mutelog_" + message.guild.id);
  if (
    !message.guild.members.cache
      .get(message.author.id)
      .hasPermission("MUTE_MEMBERS")
  )
    return message.channel.send(
        new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`> <@${message.author.id}> Mute Yetkin Olmadan Mute Sistemdeki Hiç Birşeyi Ayarlamassın.`)  
    )
    .then(m => m.delete({timeout: 5000}));
  if (!Channel)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`❗️ ❕ Daha MuteLog Ayarlamadın \n > ✅ Doğru Ayarlamak İçin \`${prefix}mute-log #kanal\``)
    )
    .then(m => m.delete({timeout: 5000}));
  await db.set("mutelog_" + message.guild.id, Channel.id);
  return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription("Daha önceden " +Log +" olarak belirlenen log kanalını <#" +Channel.id +"> kanalı ile değiştirdim!")
  )
  .then(m => m.delete({timeout: 5000}));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "mute-log",
  description: "",
  usage: ""
};
