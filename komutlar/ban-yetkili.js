const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let Rol = message.mentions.roles.first();
  let Yetkili =
    db.fetch("banyetkili_" + message.guild.id);
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
  if (!Rol) return message.channel.send( 
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`> <‼️ Daha Ban Yetkili Rölünü Ayarlamadın \n ‼️ Doğru Ayarlamak İçin \`${prefix}ban-yetkili @Rol\``)
          )
          .then(m => m.delete({timeout: 5000}));
  await db.set("banyetkili_" + message.guild.id, Rol.id);
  return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription("Daha önceden " +Yetkili +" olarak belirlenen rolü <@&" +Rol.id +"> rolü ile değiştirdim!")  
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
  name: "ban-yetkili",
  description: "",
  usage: ""
};
