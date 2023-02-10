const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
   exports.run = async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(
                new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`)    
                )
                .then(m => m.delete({timeout: 5000}));
            
        let every = message.guild.roles.cache.find(r => r.name === "@everyone");
        message.channel.createOverwrite(every, {
          SEND_MESSAGES: false
        });
      
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription("Kanal kilitlendi!")    
            )
            .then(m => m.delete({timeout: 5000}));
    }
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['sohbet-kapat'],
        permLevel: 2
    }
    
    exports.help = {
        name: 'sohbetkapat'
    }
