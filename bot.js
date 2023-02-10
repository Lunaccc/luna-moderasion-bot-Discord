const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;
require("./util/eventLoader")(client);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);
client.on("guildMemberAdd", async member => {
  const Discord = require('discord.js');
  let kanal = db.fetch(`gkanal_${member.guild.id}`)
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  var kontrol;
  if (kurulus < 1296000000) kontrol = ' ``Şüpheli`` '
  if (kurulus > 1296000000) kontrol = ' ``Güvenli`` '
    moment.locale("tr");


 const hg = new Discord.MessageEmbed()
 .setAuthor("Aramıza Yeni Bir Üye Katıldı!")
 .addField(`Toplam Kişi Sayımız:`,` ${member.guild.memberCount} Oldu!`)
 .addField(`Aramıza Hoş Geldin:`,` ${user}`)
 .addField(`> Hesap Kuruluş Tarihi: ${moment(member.user.createdAt).format(" ``DD/MMMM/YYYY``")}`,`> **Güvenlik Durumu: ${kontrol}**`)
 .setFooter(`${ayarlar.isim}`)
 .setColor("BLUE")
 .setThumbnail(user.avatarURL({dynamic:true}))   
 .setTimestamp()  
 client.channels.cache.get(kanal).send(hg)
});