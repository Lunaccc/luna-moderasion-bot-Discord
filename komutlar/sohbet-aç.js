const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(
            
            new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`)    
            )
            .then(m => m.delete({timeout: 5000}));
        let every = message.guild.roles.cache.find(r => r.name === '@everyone')
        message.channel.createOverwrite(every, {
            'SEND_MESSAGES': null,

        })


        message.channel.send(
            new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription("Kanal Kilidi Açıldı")    
            )
            .then(m => m.delete({timeout: 5000}));
    
    }
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['sohbet-aç','sohbet-ac','sohbetac'],
        permLevel: 2
    }
    
    exports.help = {
        name: 'sohbetaç'
    }

