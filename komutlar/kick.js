const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let Kişi = message.mentions.users.first();
  let Sebep = args.slice(1).join(" ");
  let Log = db.fetch("kicklog_" + message.guild.id);
  let Yetkili = db.fetch("kickyetkili_" + message.guild.id);
  let kullanici = message.mentions.members.first();

  if (!Yetkili) return message.channel.send(
      new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription("Yetkili Rol Ayarlanmamış")  
    )
    .then(m => m.delete({timeout: 5000}));
  if (!Log) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription("Log Kanal Ayarlanmamış")    
    )
    .then(m => m.delete({timeout: 5000}));

  if (!message.member.roles.cache.has(Yetkili))
    return message.channel.send(
        new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription(`> <@${message.author.id}> kick Yetkin Olmadan kick Sistemdeki Hiç Birşeyi Ayarlamassın.`) 
        )
        .then(m => m.delete({timeout: 5000}));
  if (!Kişi)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`**Örnek Kullanım:|${prefix}kick @Kişi <Sebep>|**`)
    )
    .then(m => m.delete({timeout: 5000}));
  if (
    !message.guild.members.cache
      .get(client.user.id)
      .hasPermission("KICK_MEMBERS")
  )
    return message.channel.send(
        new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`**Kick Yetkim Yok!**`)
    )
    .then(m => m.delete({timeout: 5000}));
  await kullanici.kick(Kişi.id, { reason: Sebep });
  await message.guild.channels.cache
    .get(Log)
    .send(
        new Discord.MessageEmbed()
        .setTitle("| Kick Sistem |")
        .setDescription(`**Kicklenen Üye:<@${Kişi.id}> \n\nKickleyen Yetkili:<@${message.author.id}>\n\nSebep:${Sebep}**`)
        .setFooter(`${ayarlar.isim}`)
        .setTimestamp()
    )
  return message.channel.send(
    new Discord.MessageEmbed()
    .setTitle("| Kick Sistem |")
    .setDescription(`**Kicklenen Üye:<@${Kişi.id}> \n\nKickleyen Yetkili:<@${message.author.id}>\n\nSebep:${Sebep}**`)
    .setFooter(`${ayarlar.isim}`)
    .setTimestamp()
  )
  .then(m => m.delete({timeout: 5000}));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "kick",
  description: "",
  usage: ""
};
