const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Kick Yardım|${ayarlar.isim}`)
    .setColor("#00ff00")
    .addField(
        `**__kick__**`,
        `🔨 \`${prefix}kick <kişi> <sebep>\` \n Kişiyi Sunucudan atar`,
        true
      )
    .addField(
      `**__kick-log__**`,
      `🔨 \`${prefix}kick-log <kanal>\` \n kicklog Kanal Ayarlar`,
      true
    )
    .addField(
        `**__ban-yetkili__**`,
        `🔨 \`${prefix}ban-yetkili <rol>\` \n kick Atabilecek Yetkili Rolü Ayarlar`,
        true
      )
      .setImage("https://share.creavite.co/6zE0CNldVkaM5YC6.gif")
      .setDescription(`Eğer Yazılım Sunucumuza Gelmek İsterseniz [Buraya](https://discord.gg/GaUXSSVThC) Tıklayın!`);
  msg.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Kick-help","kick-yardım","kick-sistem"],
  permLevel: 2
};
exports.help = {
  name: "kick-Yardım",
  description: "yardım Komutlarını Gösterir.",
  usage: "yardım"
};