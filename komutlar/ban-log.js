const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let Channel = message.mentions.channels.first();
  let Log = db.fetch("banlog_" + message.guild.id);
  if (
    !message.guild.members.cache
      .get(message.author.id)
      .hasPermission("BAN_MEMBERS")
  )
    return message.channel.send(
        new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`> <@${message.author.id}> Ban Yetkin Olmadan Ban Sistemdeki Hiç Birşeyi Ayarlamassın.`)      
    )
    .then(m => m.delete({timeout: 5000}));
  if (!Channel)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`❗️ ❕ Daha BanLog Ayarlamadın \n > ✅ Doğru Ayarlamak İçin \`${prefix}ban-log #kanal\``)
    )
    .then(m => m.delete({timeout: 5000}));
  await db.set("banlog_" + message.guild.id, Channel.id);
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
  name: "ban-log",
  description: "",
  usage: ""
};
