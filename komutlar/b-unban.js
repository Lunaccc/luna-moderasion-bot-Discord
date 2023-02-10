const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
    let Log = db.fetch("banlog_" + message.guild.id);
    let Sebep = args.slice(1).join(" ");

  if (!Log) return message.reply("Ban-lok Sistem Ayarlamalısın");
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  

let member = args[0]
let guild = message.guild;

if(!member) return message.channel.send(
    new Discord.MessageEmbed()
    .setTitle("Unban Sistem!")
    .setDescription("Banlanan kişinin ID sini girmelisin!")
)





guild.members.unban(member)

const embed = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL())
.setColor('RANDOM')
.addField(`Bağışlanan kullanıcı:`,`<@${member}>`)
.addField(`Bağışlayan yetkili:`,message.author)
.addField(`Sebep:`,Sebep)
.setTimestamp()
.setFooter(`${message.author.username} Tarafından Kullanıldı`)
client.channels.cache.get(Log).send(embed)
//
const embed2 = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL())
.setColor('RANDOM')
.setDescription(`✅Unban komudu Başarıyla Gerçekleştirildi`)
message.channel.send(embed2)
.then(m => m.delete({timeout: 5000}));

};
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 2
};
exports.help = {
  name: 'unban', 
  description: 'Kullanıcıya Ban Atar',
  usage: '-ban ' 
};