const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let Channel = message.mentions.channels.first();
  let Log = db.fetch("rollog_" + message.guild.id);
  if (
    !message.guild.members.cache
      .get(message.author.id)
      .hasPermission("MANAGE_ROLES")
  )
    return message.channel.send(
        new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`> <@${message.author.id}> MANAGE_ROLES Yetkin Olmadan Rol Sistemdeki Hiç Birşeyi Ayarlamassın.`)  
    )
    .then(m => m.delete({timeout: 5000}));
  if (!Channel)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`❗️ ❕ Daha RolLog Ayarlamadın \n > ✅ Doğru Ayarlamak İçin \`${prefix}rol-log #kanal\``)
    )
    .then(m => m.delete({timeout: 5000}));
  await db.set("rollog_" + message.guild.id, Channel.id);
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
  permLevel: 0
};

exports.help = {
  name: "rol-log",
  description: "",
  usage: ""
};
