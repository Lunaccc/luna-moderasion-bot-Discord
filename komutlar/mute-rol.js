const discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new discord.MessageEmbed()
    .setTitle(`${ayarlar.isim} Mute Sistemi!`)
    .setDescription("Bu Komudu Kulanmak İçin `Yönetici` Rolünüzün Olmasılazım.")
  )
  .then(m => m.delete({timeout: 5000}));


  let rol = message.mentions.roles.first()  || message.guild.roles.cache.get(args[0])  
if (!rol) {
  return  message.channel.send(
    new discord.MessageEmbed()
    .setTitle(`${ayarlar.isim} Mute Sistemi!`)
    .setDescription("Bi Rol Belirtmelisin")
  )
  .then(m => m.delete({timeout: 5000}));
}
db.set(`muterol_${message.guild.id}`, rol.id)
const embed2 = new discord.MessageEmbed()
.setTitle(`${ayarlar.isim} Mute Sistemi!`)
.setDescription(`Mute Rol Başarıyla Ayarlandı! : ${rol}`)
message.channel.send(embed2)
.then(m => m.delete({timeout: 5000}));
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["muterol"],
  permlevel: 3
}
exports.help = {
  name: 'mute-rol',
}