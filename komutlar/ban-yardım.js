const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Ban Yardım|${ayarlar.isim}`)
    .setColor("#00ff00")
    .addField(
        `**__ban__**`,
        `🔨 \`${prefix}ban <kişi> <sebep>\` \n Kişiyi Sunucudan Banlar`,
        true
      )
    .addField(
      `**__ban-log__**`,
      `🔨 \`${prefix}ban-log <kanal>\` \n Banlog Kanal Ayarlar`,
      true
    )
    .addField(
        `**__ban-yetkili__**`,
        `🔨 \`${prefix}ban-yetkili <rol>\` \n Ban Atabilecek Yetkili Rolü Ayarlar`,
        true
      )
    .addField(
        `**__ban-say__**`,
        `🔨 \`${prefix}ban-say\` \n Sunucuda Banlı Olan Kişi Sayısını Gösterir`,
        true
      )
      .addField(
        `**__unban__**`,
        `🔨 \`${prefix}unban <id>\` \n Sunucuda Banlı Olan Kişi Sayısını Gösterir`,
        true
      )
      .setImage("https://share.creavite.co/6zE0CNldVkaM5YC6.gif")
      .setDescription(`Eğer Yazılım Sunucumuza Gelmek İsterseniz [Buraya](https://discord.gg/GaUXSSVThC) Tıklayın!`);
  msg.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban-help","ban-yardım","ban-sistem"],
  permLevel: 2
};
exports.help = {
  name: "Ban-Yardım",
  description: "yardım Komutlarını Gösterir.",
  usage: "yardım"
};