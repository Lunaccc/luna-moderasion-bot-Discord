const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let Log = db.fetch("banlog_" + message.guild.id);
  if (!message.guild.members.cache.get(message.author.id).hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
        new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`> <@${message.author.id}> Yetkin Yetersiz.`)      
    )
    .then(m => m.delete({timeout: 5000}));
       
        let user = message.mentions.members.first();
        let yeniisim = args.slice(1).join(' ');
        if(!yeniisim) {
            const isimgir = new Discord.MessageEmbed()
                .setTitle('Değiştirilecek İsmi Girmen Gerek!')
                .setDescription('Henüz bir isim girmemişsin! Örnek kullanım "[prefix]setname @hedefkullanıcı yeniisim"')
                .setColor('008000')
            return message.channel.send(isimgir)
            .then(m => m.delete({timeout: 5000}));
        }

        if(!user) {
            const etiket = new Discord.MessageEmbed()
                .setTitle('Kullanıcı Etiketlememişsin!')
                .setDescription('Hedef kullanıcıyı etiketlememişsin! Örnek kullanım "[prefix]setname @hedefkullanıcı yeniisim"')
                .setColor('008000')
            return message.channel.send(etiket)
            .then(m => m.delete({timeout: 5000}));
        }

        if(yeniisim.length > 32) {
            const uzun = new Discord.MessageEmbed()
                .setTitle('Yeni İsim Çok Uzun!')
                .setDescription('Kullanıcının yeni ismi çok uzun! Discord API maksimim 32 karakter destekliyor. Örnek kullanım "[prefix]setname @hedefkullanıcı yeniisim"')
                .setColor('008000')
            return message.channel.send(uzun)
            .then(m => m.delete({timeout: 5000}));
        }
        const oldu = new Discord.MessageEmbed()
        .setTitle('Kullanıcı adı değiştirildi!')
        .setDescription(`**İsimi Değiştirilen Üye:${user} \n\n İsmi Değiştiren Yetkili:<@${message.author.id}>\n\n Yeni İsmim:${yeniisim}**`)
        .setColor('008000')
        .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(oldu)
       
        .then(m => m.delete({timeout: 5000}));

    await message.guild.channels.cache
    .get(Log)
    .send(
        new Discord.MessageEmbed()
        .setTitle('Kullanıcı adı değiştirildi!')
        .setDescription(`**İsimi Değiştirilen Üye:${user} \n\n İsmi Değiştiren Yetkili:<@${message.author.id}>\n\n Yeni İsmim:${yeniisim}**`)
        .setColor('008000')
        .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({ dynamic: true }))
        )
    message.guild.member(user).setNickname(`${yeniisim}`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isimdeğiştir","isim-degiştir"],
  permLevel: 2
};

exports.help = {
  name: "isim-değiştir",
  description: "",
  usage: ""
};
