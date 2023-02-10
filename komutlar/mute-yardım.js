const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Mute Yardım|${ayarlar.isim}`)
    .setColor("#00ff00")
    .addField(
        `**__mete__**`,
        `🔨 \`${prefix}kick <kişi> <sebep>\` \n Kişiyi Sunucuda Muteler`,
        true
      )
      .addField(
        `**__unmete__**`,
        `🔨 \`${prefix}kick <kişi> <sebep>\` \n Kişiyin Mutesini Kaldırır`,
        true
      )
    .addField(
      `**__mute-log__**`,
      `🔨 \`${prefix}mute-log <kanal>\` \n Mutelog Kanal Ayarlar`,
      true
    )
    .addField(
        `**__mute-yetkili__**`,
        `🔨 \`${prefix}mute-yetkili <rol>\` \n Mute Atabilecek Yetkili Rolü Ayarlar`,
        true
      )
      .addField(
        `**__mute-rol__**`,
        `🔨 \`${prefix}mute-rol <rol>\` \n Mute Atılınca Verilcek Rol`,
        true
      )
      .addField(
        `**__üye-rol__**`,
        `🔨 \`${prefix}üye-rol <rol>\` \n Mute Atılınca Alıncak Rol`,
        true
      )
      .setImage("https://share.creavite.co/6zE0CNldVkaM5YC6.gif")
      .setDescription(`Eğer Yazılım Sunucumuza Gelmek İsterseniz [Buraya](https://discord.gg/GaUXSSVThC) Tıklayın!`);
  msg.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute-help","mute-yardım","mute-sistem"],
  permLevel: 2
};
exports.help = {
  name: "Mute-Yardım",
  description: "yardım Komutlarını Gösterir.",
  usage: "yardım"
};