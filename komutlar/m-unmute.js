const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
    exports.run = async(client, message, args) => {
        let üyerol = db.fetch(`üyerol_${member.guild.id}`)
        let muterol = db.fetch(`muterol_${member.guild.id}`)
        let Log = db.fetch("mutelog_" + message.guild.id);
        let Yetkili = db.fetch("muteyetkili_" + message.guild.id);
        let kullanıcı = message.mentions.members.first();
        if (!Yetkili) return message.channel.send(
            new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription("Yetkili Rol Ayarlanmamış")  
          )
          .then(m => m.delete({timeout: 5000}));
        if (!Log) return message.channel.send(
          new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription("Log Kanal Ayarlanmamış")    
          )
          .then(m => m.delete({timeout: 5000}));
      
        if (!message.member.roles.cache.has(Yetkili))
          return message.channel.send(
              new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(`> <@${message.author.id}> Mute Yetkin Olmadan Mute Sistemdeki Hiç Birşeyi Ayarlamassın.`) 
              )
              .then(m => m.delete({timeout: 5000}));
    
        if(!kullanıcı){
            const cmfhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`**Lütfen Kullanıcı Belirt.**`)
            return message.channel.send(cmfhata)
        }
        
        if(kullanıcı){
            const mute = new Discord.MessageEmbed()
            .setTitle("| Mute Sistem |")
            .setDescription(`${kullanıcı} Kişisinin Mutesi ${message.author} Tarafından Kaldırıldı.`)
            .setFooter(`${ayarlar.isim}`)
            .setTimestamp()
            message.channel.send(mute)
            .then(m => m.delete({timeout: 5000}));
            await message.guild.channels.cache
            .get(Log)
            .send(
            new Discord.MessageEmbed()
            .setTitle("| Mute Sistem |")
            .setDescription(`${kullanıcı} Kişisinin Mutesi ${message.author} Tarafından Kaldırıldı.`)
            .setFooter(`${ayarlar.isim}`)
            .setTimestamp()
            )

            // Mute Kaldırıldığında Alınacak & Verilecek Roller
            kullanıcı.roles.add(üyerol)
            kullanıcı.roles.remove(muterol)
        }

    } 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['UnMute','UNMUTE','susturmakaldır','Susturmakaldır','SUSTURMAKALDIR'],
    permLevel: 2
}

exports.help = {
    name: 'unmute'
}