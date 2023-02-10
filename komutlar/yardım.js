const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Admin Yardım|${ayarlar.isim}`)
    .setColor("#00ff00")
    .addField(
        `**__ban-sistem__**`,
        `🔨 \`${prefix}ban-sistem\` \n Ban Sistem Gösterir`,
        true
      )
      .addField(
        `**__kick-sistem__**`,
        `🔨 \`${prefix}kick-sistem\` \n Kick Sistem Gösterir`,
        true
      )
      .addField(
        `**__mute-sistem__**`,
        `🔨 \`${prefix}mute-sistem\` \n Mute Sistem Gösterir`,
        true
      )
      .addField(
        `**__hg-kanal__**`,
        `🔨 \`${prefix}hg-kanal <kanal>\` \n Sunucunuza Yeni Üye Geldiğinde Mesaj Atar`,
        true
      )
      .addField(
        `**__isim-değiştir__**`,
        `🔨 \`${prefix}isim-değiştir <kişi> <yeniisim>\` \n Kişinin İsmini Değiştirir`,
        true
      )
      .addField(
        `**__rol-al__**`,
        `🔨 \`${prefix}rol-al <kişi> <rol>\` \n Kişinin Rolü Alınır`,
        true
      )
      .addField(
        `**__rol-ver__**`,
        `🔨 \`${prefix}rol-ver <kişi> <rol>\` \n Kişiye Rol Verilir`,
        true
      )
      .addField(
        `**__sil__**`,
        `🔨 \`${prefix}sil <sayı>\` \n belirtilen Sayı Kadar Mesaj Siler`,
        true
      )
      .addField(
        `**__sohbet-kapat__**`,
        `🔨 \`${prefix}sohbet-kapat\` \n Bulunduğunuz Kanalı Everyone Kulanıcısına Kapatır`,
        true
      )
      .addField(
        `**__sohbet-aç__**`,
        `🔨 \`${prefix}sohbet-aç\` \n Bulunduğunuz Kanalı Everyone Kulanıcısına Açar`,
        true
      )
      .setImage("https://share.creavite.co/6zE0CNldVkaM5YC6.gif")
      .setDescription(`Eğer Yazılım Sunucumuza Gelmek İsterseniz [Buraya](https://discord.gg/GaUXSSVThC) Tıklayın!`);
  msg.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help","yardım"],
  permLevel: 2
};
exports.help = {
  name: "Yardım",
  description: "yardım Komutlarını Gösterir.",
  usage: "yardım"
};