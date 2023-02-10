const discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');

exports.run = async(client, message, args) => {


    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
      new discord.MessageEmbed()
      .setTitle(`${ayarlar.isim} hg-bb Sistemi!`)
      .setDescription("Bu Komudu Kulanmak İçin `Yönetici` Rolünüzün Olmasılazım.")
    )
    .then(m => m.delete({timeout: 5000}));


    let kanal = message.mentions.channels.first();    
    if (!kanal) {
      return  message.channel.send(
        new discord.MessageEmbed()
        .setTitle(`${ayarlar.isim} hg-bb Sistemi!`)
        .setDescription("Lütfen Bir Kanal Belirt")
      )
      .then(m => m.delete({timeout: 5000}));
    }
    db.set(`gkanal_${message.guild.id}`, kanal.id)
    const embed2 = new discord.MessageEmbed()
    .setTitle(`${ayarlar.isim} hg-bb Sistemi!`) 
    .setDescription(`HG Kanalı Başarıyla Ayarlandı! : ${kanal}`)
    message.channel.send(embed2)
    .then(m => m.delete({timeout: 5000}));
      
    }
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["hg-kanal"],
  permlevel: 3
}
exports.help = {
  name: 'hgkanal',
}