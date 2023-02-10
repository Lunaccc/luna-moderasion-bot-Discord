const Discord = require("discord.js");
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
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        "⚠ **Uyarı** ⚠",
        "`rol-al` **Adlı Komutu Özel Mesajlarda Kullanamazsın!**"
      );
    return message.author.sendEmbed(ozelmesajuyari);
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
  let user = message.mentions.members.first();

  if (!user)
    return message.channel
      .send("**⚠ Rol alabilmek icin kullanıcının ismini ve alınacak rölü yazmalısın!**")
      .catch(console.error);
 user.roles.remove(rol);

  const embed = new Discord.MessageEmbed()
    .setDescription(
      `✅ | Başarıyla ${user} İsimli Kullanıcıdan ${rol} İsimli Rol Alındı!`
    )
    .setFooter(client.user.username, client.user.avatarURL)
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send({ embed });

 message.guild.channels.cache
  .get(Log)
  .send(
      new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`✅ | Başarıyla ${user} İsimli Kullanıcıdan ${rol} İsimli Rol Alındı!`)
    .setFooter(`${ayarlar.isim}`)
    .setTimestamp()
  )
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolal", "ra"],
  permLevel: 3
};
exports.help = {
  name: "rol-al",
  description: "İstediğiniz kişiden istediğiniz rolü alır.",
  usage: "rol-al [kullanıcı] [@rol]"
};