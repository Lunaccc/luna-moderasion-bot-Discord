const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db");
exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  if (!message.guild) {
    const embed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        "⚠ **Uyarı** ⚠",
        "`rol-ver` **Adlı Komutu Özel Mesajlarda Kullanamazsın!**"
      );
    return message.author.sendEmbed(embed);
  }
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription("```⚠ Ne yazık ki bu komutu kullanmaya yetkin yok. ⚠ ```")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }
  let Log = db.fetch("banlog_" + message.guild.id);
  let guild = message.guild;
  let rol = message.mentions.roles.first();
  let kişi = message.mentions.members.first();
  if (!kişi)
  if (!message.mentions.users.first())
    return message
      .reply(
          new Discord.MessageEmbed()
          .setTitle("Rol-Ver Sisem")
          .setDescription("**⚠ Rol verebilmek icin kullanıcının ismini ve verilecek rölü yazmalısın! ⚠ **")
      )
      .catch(console.error);

      kişi.roles.add(rol);
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(
      `✅  Başarıyla ${kişi} İsimli Kullanıcıya ${rol} İsimli Rol Verildi!`
    )
    .setFooter(`${ayarlar.isim}`);
  message.channel.send(embed);

   message.guild.channels.cache
  .get(Log)
  .send(
      new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`✅  Başarıyla ${kişi} İsimli Kullanıcıya ${rol} İsimli Rol Verildi!`)
    .setFooter(`${ayarlar.isim}`)
    .setTimestamp()
  )
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 3
};
exports.help = {
  name: "rol-ver",
  description: "İstediğiniz kişiyi istediğiniz rolü verir.",
  usage: "rol-ver [kullanıcı] [@rol]"
};