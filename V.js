const http = require('http');
const express = require('express');
const app = express();
let prefix = ("$");
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});
 
app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 200);

const Discord = require('discord.js');
const dg = require("discord-gestor");

const client = new Discord.Client();


client.on('ready', () => {
    setInterval(() => {
      let statuses = [`My Prefix: $`, `$help - Version: 2.5`,`${client.users.size} Users! ${client.guilds.size} Servers!`,`Use $vote to vote me`,`http://bit.ly/EarthGames`]
      var status = Math.floor((Math.random() * statuses.length))
           let dtus = statuses[status];
      client.user.setPresence({
       status: "dnd",
       game: {
           name: `${dtus}`,
           url: "https://www.twitch.tv/byminelyt",
           type: "PLAYING"
       }
   });
    }, 3000); //Esto hace que cambie cada 3 segundos
})

  client.on('guildMemberAdd', member => {
let channel = member.guild.channels.find('name', 'registro-bienvenidas-earthgames');
   const owner = client.users.get('420297290473799700'); 
      let embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setAuthor("EarthGames System" , client.user.avatarURL)  
.addField("Bienvenido", "[Invite](https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot) | [Soporte](https://discord.gg/UUk34J8)")
.addField("**Usuario**", `${member}`)
.addField("**Servidor**", `${member.guild.name}`)      
.addField("**Mensaje**", `Eres bienvenido a ${member.guild.name}`)
.setThumbnail(client.user.avatarURL)      
.setFooter('TheDevelopmentWorld', client.user.avatarURL)
.setTimestamp() //<-- indicador de tiempo
.setColor("#FE0000")
channel.send({ embed })
  });



client.on('message', async message => {

 
   const ytdl = require("ytdl-core")   
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

const command = args.shift().toLowerCase();
const superagent = require("superagent");

  
 if(message.content.startsWith(prefix + 'esay')){
           if (!message.member.hasPermission(" ")) return message.channel.send("Necesitas ser administrador para usar este comando.")

		   const embed = new Discord.RichEmbed()
		   .setColor('#FE0000')
       .setDescription(args, true)
 message.channel.send(embed)
message.delete()
	   
}
 if(message.content.startsWith(prefix + 'serverInfo')){
			var server = message.guild;
      const humanLevels = {
    0: 'Ninguno',
    1: 'Bajo',
    2: 'Mediano',
    3: '(?°?°)?? ???',
    4: '??? ??(???)?????'
};
		  
			const embed = new Discord.RichEmbed()
			.setThumbnail(server.iconURL)
			.setAuthor(server.name, server.iconURL)
			.addField('ID', server.id, true)
			.addField('Región', server.region, false)
			.addField('Creado el', server.joinedAt.toDateString(), true)
			.addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ID: ('+server.owner.user.id +')', false)
			.addField('Miembros', server.memberCount, false)
      .addField("Miembros online ", server.members.filter(member => member.presence.status == 'online').size, true)
      .addField('Miembros ocupados', server.members.filter(member => member.presence.status == 'dnd').size, true)
      .addField('Miembros ausentes', server.members.filter(member => member.presence.status == 'idle').size, true)
      .addField('Miembros offline', server.members.filter(member => member.presence.status == 'offline').size, true)
			.addField('Roles', server.roles.size, false)
      .addField("Último miembro", `${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1)}`)
      .addField("Rol Predeterminado", server.defaultRole, true)
      .addField("Personas", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, false)
      .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
      .addField("Emojis", server.emojis.size, false)
      .addField('Niveles de Seguridad', humanLevels[message.guild.verificationLevel])
      .setTimestamp()
      .setColor(0xA901DB)
      .setFooter(client.user.username, client.user.avatarURL)
			
		   message.channel.send({ embed });
		
		  }
   
 if(message.content.startsWith(prefix + 'report')){
    let canal = client.channels.get('567680436113768449')
    if (!args) return message.channels.send('Escriba la razón del reporte.');
    const embed = new Discord.RichEmbed()
    .setThumbnail(message.author.avatarURL)
    .setDescription('Un nuevo reporte sobre usuarios')
    .addField('El usuario que ha reportado es', message.author.tag)
    .addField('Su reporte es', args)
    .addField('De la sala', message.channel.name)
    .setColor("#363843")
    .setFooter('Debemos atender su caso!!')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTimestamp()
    canal.send(embed)
    message.channel.send('Su reporte ha sido enviado con éxito,¡será revisado enseguida!')
  }  
  
  
  
  
  
 if(message.content.startsWith(prefix + 'emojis')){
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ")
  const embed = new Discord.RichEmbed()

    .setTitle("Server emoji list:")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription(emojiList)
    .setFooter(message.guild.name, client.user.avatarURL)
  .setThumbnail(message.guild.iconURL)
  .setTimestamp()
  .setColor(0xA901DB)
      message.channel.send({embed})

}
 if(message.content.startsWith(prefix + 'channels')){
        let id = message.guild.id;
const embed = new Discord.RichEmbed()
    .setColor(0xA901DB)
    .setAuthor(message.author.username, message.author.avatarURL)
.setTitle('Server channels list:')
    .setDescription(""+client.guilds.get(id).channels.map(r => r.name).join(", ")+"")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.name, client.user.avatarURL)

message.channel.send({embed});



}

  
  if(message.content.startsWith(prefix + "NSFW Help")) {
    message.channel.send(`${message.author.username} **¡¡¡Te e enviado un mensaje privado!!!**`);
 
  }else
 if(message.content.startsWith(prefix + 'miner')){
var rpts = ["??Minaste vale: 19.000, pagaste pro los explosivos 100, pro la mina 1.000: Dinero Conseguido ??17.900",
            "No minaste Nada pero por el camino te dan un regalo ?? es: ??1.000", "Minaste ORO: lo refinas i haces una ??medalla vale 16.872: pagas por explosivos 100, por  la mina 50, i por refinar 1.000, queda ??15.722 ", 
            "No minaste Nada pero por el camino te dan un regalo ?? es: ??-1.000", "Minaste Mucho Hierro, Haces una fabrica de herramientas ??, la fabrica vale 1.010, la enpresa 2.201 , la mina vale 200 , ganas 5.000, en total:??1.589  ",];

if (!args) return message.reply(`Escriba una pregunta.`);
message.channel.send(message.member.user+' '+args+''+ rpts[Math.floor(Math.random() * rpts.length)]+''); }

  if(message.content.startsWith(prefix + 'test')){
  const { ImagixRead, ImagixFont, ImagixImage } = require('imagix');
 
 
// create a new font to print, use the ImagixFont class
let text1 = new ImagixFont('text to print', 20, 100,
                // text a print, point in X, point in Y       
    {
    //Options for a font
        size: 32, // size of the font
        color: 'WHITE' // color of the font 
 
    });
 
// create a new image to print, use the ImagixImage class
let img1 = new ImagixImage('avatar.png', {
    //Options for a image
        x: 15,   // point in X
        y: 45,   // point in Y
        resize: 130  //define the size of the image.
    });
 
  
  }
          if(message.content.startsWith(prefix + "clear")){ 
  let cantidad = parseInt(args[0]);
message.channel.bulkDelete(cantidad);
  }
  
    if(message.content.startsWith(prefix + 'raimbow')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.rainbow(member.displayAvatarURL)
message.channel.send({files: [img]})}
  
      if(message.content.startsWith(prefix + 'drake')){
    var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.drake(message.author.displayAvatarURL, member.displayAvatarURL)
 
message.channel.send({files: [img]})
      }
              if(message.content.startsWith(prefix + 'basura')){
    var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.basura(member.displayAvatarURL)
 
message.channel.send({files: [img]})
    }
if(message.content.startsWith(prefix + 'coche')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.coche(message.author.displayAvatarURL, member.displayAvatarURL)
message.channel.send({files: [img]})}
  
    if(message.content.startsWith(prefix + 'susto')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.susto(member.displayAvatarURL)
message.channel.send({files: [img]})}
  
    if(message.content.startsWith(prefix + 'pintura')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.bob(member.displayAvatarURL)
message.channel.send({files: [img]})}
  
  
  if(message.content.startsWith(prefix + 'trump')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.trump(args.join(" "))
message.channel.send({files: [img]})}
  
    if(message.content.startsWith(prefix + 'twet')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.twet(args.join(" "))
message.channel.send({files: [img]})}

  
    if(message.content.startsWith(prefix + 'eyes')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.eyes(args[0],args[1],args[2])
message.channel.send({files: [img]})}
  
      if(message.content.startsWith(prefix + 'gru')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.gru(args[0],args[1],args[2],args[3])
message.channel.send({files: [img]})}
  
      if(message.content.startsWith(prefix + 'logro')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.logro(args.join(" "))
message.channel.send({files: [img]})}
  
    if(message.content.startsWith(prefix + 'wasted')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.wasted(member.displayAvatarURL)
message.channel.send({files: [img]})}
  
  
        if(message.content.startsWith(prefix + 'meme')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.randomMeme()
message.channel.send({files: [img]})}

  if(message.content.startsWith(prefix + "commands")){       
    const embed = new Discord.RichEmbed() 
    .setTitle("Estos son mis comandos actuales")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('#FF0800')
    .setDescription("[Soporte](https://discord.gg/UUk34J8) | [Invitacion](https://discordapp.com/api/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot)")
    .setFooter("Bot creado por: @ERROR 502#0908 ", client.user.avatarURL)
    .setImage("https://i.imgur.com/BwPBeG9.gif")
    .setThumbnail("https://cdn.discordapp.com/emojis/556790540390367263.gif?v=1")
    .setTimestamp()  
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
    .addField("Informacion ??","``$VoiceHelp`` ``$rol`` ``$user`` ``$botstats`` ``$botinfo`` ``$nivel`` ``$puntos``")
    .addField("Musica ??", "``$music bot`` ``$join`` ``$salir`` ``$radio``", true)
    .addField("Diversion ??","``$miner`` ``$8ball`` ``$fish`` ``$loveRandom [Mencion]`` ``$roll100`` ``$flipCoin``")
    .addField("Imagen ??","``$kiss [Mencion]`` ``$dab`` ``$eyes [Texto1] [Texto2] [Texto3]`` ``$kill [Mencion]`` ``$killGif`` ``$raimbow [Mencion]`` ``$pepeAvatar`` ``$boom`` ``$wasted [Mencion]`` ``$fiesta`` ``$drake [Mencion]`` ``$logro [Texto]`` ``$trump [Texto]`` ``$susto [Mencion]`` ``$basura [Mencion]`` ``$coche [Mencion]`` ``$pintura [Mencion]`` ``$loli`` ``$moneda`` ``$cargif`` ``$dog`` ``$avatar`` ``$meme`` ``$beso [Mencion]``")
    .addField("NSFW ??","``Para ber los comandos usa el comando $NSFW Help``")
    .addField("Busqueda ??","``$searchyoutube`` ``$searchgif``  ``$searchgoogle``")
    .addField("Moderacion ??", "``$kick`` ``$ban`` ``$mute [Mencion]`` ``$clear [Cantidad]``", true)
    .addField("Economia ??", "``$minar`` ``$transferir`` ``$tmonedas`` ``$rep`` ``$reputaciones`` ``$top`` ``$mtop``", true)
    .addField("Utilidad ?", "``$say`` ``$esay`` ``$web`` ``$invite`` ``$serverInfo`` ``$servers`` ``$channels`` ``$emojis`` ``$discord`` ``$vote`` ``$poll`` ``$sugerencia (Tu Sugerencia)`` ``$reportBug (Tu Reporte)``", true)
    .addField("Giveaways ??","``$giveaway [Saca a un solo usuario]`` ``$giveaway2 [Saca a dos usuarios]`` ``$giveaway3 [Saca a 3 usuarios]``")

    message.channel.send(embed)
.then(m => {
        m.react("\ud83c\udf0f");
        m.react("\ud83c\udd98");
        m.react("\ud83c\udf0d");
        m.react("\ud83d\ude3b");
    });
  }
      if(message.content.startsWith(prefix + "help")){       
  const embed = new Discord.RichEmbed() 
    .setTitle("Earth Games | System")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('#FF0800')
    .setDescription("[Invitacion](https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot) | [Soporte](https://discord.gg/UUk34J8)")
    .setFooter("Earth Games System - Created By: ERROR 502#0908", client.user.avatarURL)
    .setImage('https://cdn.discordapp.com/attachments/549230500527603712/550745022564270090/EarthGames.png')
    .setThumbnail('https://cdn.discordapp.com/emojis/557534857685630976.gif?v=1')
    .setTimestamp()
    .setURL("https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
    .addField("?? **?[Prefix]**", "``[ $ ]``")
    .addField("?? **Sala de comandos**", "``$commands``",  true)
    .addField("?? **Para que sirvo**", "``Soy un bot de diversion y moderacion``")
    .addField("?? **Bugs - Dudas**", "``Unete al servidor de discord o usa: $sugerencia (Tu Sugerencia) $reportBug (Tu Reporte)``", true)

    message.channel.send(embed)
.then(m => {
        m.react("\ud83c\udf0f");
        m.react("\ud83c\udd98");
        m.react("\ud83c\udf0d");
        m.react("\ud83d\ude3b");
    });

    
              if (message.content.startsWith(prefix + "testHelp")) {
            const loading = client.emojis.get("547137142288285738")
      const emj = client.emojis.get('542018374901956631')
            const embed = new Discord.RichEmbed()
      .setColor('#cc33ff')
      .setDescription(`**${loading} Loading**`)
            
            
  const embed2 = new Discord.RichEmbed() 
    .setTitle("Earth Games | System")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('#FF0800')
    .setDescription("[Invitacion](https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot) | [Soporte](https://discord.gg/UUk34J8)")
    .setFooter("Earth Games System - Created By: ERROR 502#0908", client.user.avatarURL)
    .setImage('https://cdn.discordapp.com/attachments/549230500527603712/550745022564270090/EarthGames.png')
    .setThumbnail('https://cdn.discordapp.com/emojis/557534857685630976.gif?v=1')
    .setTimestamp()
    .setURL("https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
    .addField("?? **?[Prefix]**", "``[ $ ]``")
    .addField("?? **Sala de comandos**", "``$commands``",  true)
    .addField("?? **Para que sirvo**", "``Soy un bot de diversion y mederacion``")
    .addField("?? **Bugs - Dudas**", "``Unete al servidor de discord o usa: $sugerencia (Tu Sugerencia) $reportBug (Tu Reporte)``", true)

message.channel.send(embed).then(m => setTimeout(() => m.edit(embed2) , 3000))       
              
              } 
        
        
if(message.content.startsWith(prefix + "puppy")){
const randomPuppy = require('random-puppy');

randomPuppy().then(url =>{

      message.channel.send(url);
      

}).catch(err => message.channel.send("Hubo un error, inténtelo nuevamente."));
}      
                
        }else
if (message.content.startsWith(prefix + 'ping')){
if (command === "ping"){
let ping = Math.floor(message.client.ping);

message.channel.send(":ping_pong: Pong!")
.then(m => {
     const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
     .setDescription(`:incoming_envelope: Ping Mensajes: \`${m.createdTimestamp - message.createdTimestamp} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``)
     .setColor('#FE0000')
                
     m.edit({embed});

});

}


  
          }else
  if(message.content.startsWith(prefix + "botstats" )){
    const embed = new Discord.RichEmbed() 
    .setTitle("Estas son mis estadisticas")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('#FF0800')
    .setDescription("Aqui puedes ber todas mis estadisticas")
    .setFooter("Bot creado por: @ERROR 502#0908 ", client.user.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
    .addField("Servidores??",`${client.guilds.size.toLocaleString()}`, true) 
    .addField("Usuarios??",`${client.users.size.toLocaleString()}`, true)
    .addField("Canales??",`${client.channels.size.toLocaleString()}`, true)
    .addField("Conexiones a voz??", `${client.voiceConnections.size}`, true)
    .addField("Memoria??", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Libreria??", `Discord ^11.2.1 (Js)`, true)
    .addField("Dueño??", "ERROR 502#0908", true)
    .addField("Version?", "2.5", true)
    .addField("Modo??","Multi Host"); 
        
    message.channel.send({embed})
    message.delete();
    
              }else
  if(message.content.startsWith(prefix + "botinfo" )){
    const embed = new Discord.RichEmbed() 
    .setTitle("Estas son mis estadisticas")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('#FF0800')
    .setDescription("Hola me llamo EarthGames")
    .setFooter("Bot creado y desarroyado por: @ERROR 502#0908 ", client.user.avatarURL)
    .setImage("https://cdn.discordapp.com/attachments/549221304394317834/550351505811570698/EarthGames.png")
    .setThumbnail("https://cdn.discordapp.com/avatars/545673449901785110/5ebaf8d7e34f3485dd64d6e4983946f1.png?size=2048")
    .setTimestamp()
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
    .addField("Prefix","$")
    .addField("Comando Principal", "``$help``")
    .addField("Tipo de bot","Soy un bot echo para las comunidades de discord", true)
    .addField("Otras cosas","Tengo muchos comandos de diversion para que no te aburras!", true)
    .addField("Host", "24/7", true)
    .addField("Libreria", "Discord.Js", true)
    .addField("Creador", "ERROR 502#0908", true)
    .addField("Version", "1.5", true)
    .addField("Modo","Multi Host")
    .addField("Invitacion", "https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot")
        
        message.channel.send(embed)
.then(m => {
        m.react("\ud83c\udf0f");
        m.react("\ud83c\udf0d");
message.delete();
});
    message.delete();
  
  
  }else
  if (message.content.startsWith(prefix + "avatar" )){
  let img = message.mentions.users.first()

if (!img) {
   
    const embed = new Discord.RichEmbed()
    .setImage(`${message.author.displayAvatarURL}`)
    .setColor('#FF0800')
    .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
    message.channel.send({ embed });

} else {

    const embed = new Discord.RichEmbed()
    .setImage(`${img.displayAvatarURL}`)
    .setColor('#FF0800')
    .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
    message.channel.send({ embed });

};
    
            
      }else
        if(command === 'setname'){
  
          const nombre = args.join(' ')
        message.guild.members.array().forEach(i => i.setNickname(`DiamondPlay.mygs.co`))
          message.channel.send(`Setting Names To: ${nombre}`);
        message.delete()

                  
          }else
if (command == "name") {
if (message.author.id !== "420297290473799700") return;
  const embed = new Discord.RichEmbed()
  .setAuthor('Reloading Names...', client.avatarURL )
    message.channel.send({embed}).then(msg => msg.delete(9000))
  message.guild.members.array().forEach(i => i.setNickname(``))
message.delete()
  
  
      }else   
      if(command === 'leave'){
        if (message.author.id !== "420297290473799700") return;

const text = args
client.guilds.get(`${args}`).leave()
        message.channel.send('Hasta Pronto')
      
      
      
      }else
if(command === 'bye'){
  if (message.author.id !== "420297290473799700") return;

  const server = message.guild.id
  client.guilds.get(`${server}`).leave()

  
        
    
        
    
  }else
  if (message.content.startsWith(prefix + "user" )){
  let userm = message.mentions.users.first()

if(!userm){
  var user = message.author;
      
  const embed = new Discord.RichEmbed()
    .setThumbnail(user.avatarURL)
    .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
    .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
    .addField('ID', user.id, true)
    .addField('Estado', user.presence.status, true)
    .addField('Apodo', message.member.nickname, true)
    .addField('Cuenta Creada', user.createdAt.toDateString(), true)
    .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
    .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
    .setColor('#FF0800')
        
  message.channel.send(embed);

}else{
  const embed = new Discord.RichEmbed()
    .setThumbnail(userm.avatarURL)
    .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
    .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
    .addField('ID', userm.id, true)
    .addField('Estado', userm.presence.status, true)
    .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
    .setColor('#FF0800')
    
  message.channel.send(embed);

}
    }else
             if(message.content.startsWith(prefix + 'tempmute')) {
                 const emojisp = client.emojis.get("542018374021152779")
               const ms = require ('ms')
 let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#FF0800",
        permissions:[""]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.channel.send(`${emojisp}, <@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"

            }
        
              if (message.content.startsWith(prefix + "roll100" )){
        let roll = message.content.split(' ').slice(1);
if(roll < 0) return message.reply(`escriba un número entre 1 y 100!`);
if(roll > 100) return message.reply(`escriba un número entre 1 y 100!`);
    
let randomroll  = Math.floor(Math.random() * roll) + 1;
let random = Math.floor(Math.random() * 100) + 1;
    
if(!roll[0]){
    message.channel.send('Del 1 al 100 la maquina saco: '+random)
    
}else{
    message.channel.send('Del 1 al '+roll+' la maquina saco: '+randomroll)
    
}
                
                                }else
if(message.content.startsWith(prefix + 'fiesta')){
const meme = 
['https://i.pinimg.com/originals/64/05/6d/64056d4220197ae8ebe69b7b540b7a0c.gif',
 'https://orig00.deviantart.net/98af/f/2019/013/e/6/_gif____luna_el_alma_de_la_fiesta_by_thundersteam-dcx0jq6.gif',
 'http://31.media.tumblr.com/tumblr_m4rnfy2vQ71rt08x8o1_400.gif',
 'https://m0.joe.co.uk/wp-content/uploads/2017/08/23174455/7itaE903vU8JA-NPqn_QobmkM5E.gif'];


message.channel.send(''+message.author.username+' se unio a la fiesta!',{files: [meme[Math.floor(meme.length * Math.random())]]});
    
    
        
                
    }else
      if(message.content.startsWith(prefix + 'dog')){
    const got = require('got');

got('https://random.dog/woof.json').then(res=>{
    
    message.channel.send(JSON.parse(res.body).url);
    
});

          }else
if(message.content.startsWith(prefix + 'carGif')){
  let elementos = ['https://media1.tenor.com/images/a422e1f9e2511722183a250c36b1e02c/tenor.gi','https://media.giphy.com/media/swK2LxtYkwSI0/giphy.gif','https://66.media.tumblr.com/02443dda2b28e0f46829436942208a0f/tumblr_ou1wdoUVj81rjorvbo1_400.gif','https://j.gifs.com/El22lY.gif','http://foro.clubjapo.com/uploads/default/original/2X/0/06ce41ff890f64bb1b1677453449b2e573bac490.gif','https://media.giphy.com/media/C5FJACTLupo2I/giphy.gif','https://media.giphy.com/media/yU7wY3gfH6WwU/giphy.gif','https://www.top10motor.com/wp-content/uploads/2017/03/jeep-librarse-tr%C3%A1fico.gif','https://media1.tenor.com/images/35a88ca6ffad0a0a41262fac58ee6561/tenor.gif?itemid=12474605','https://googifs.es/gif/2015/12/mustang-v8.gif','https://lh3.googleusercontent.com/-m9gMQFis2SY/VwPlWinVqqI/AAAAAAAABcA/DahYKTbR5b0Dc-M8QL4gA30GbpVlUHYHQ/w500-h281/tumblr_o3ulkcT7fK1rpdptuo1_r1_500.gif','https://www.recreoviral.com/wp-content/uploads/2015/10/coche-de-juguete-en-tama%C3%B1o-real-1.gif','https://statics.memondo.com/p/99/cfs/2014/09/CF_19313_28631c59eca1405f9058cce4a86d6d69_perros_tu_coche_tiene_115_caballos_el_mio_con_un_perro_ya_tira.gif'];

let captura = elementos[Math.floor(elementos.length * Math.random())];

const embed = new Discord.RichEmbed() 
            .setColor('#FF0800')
            .setImage(captura)

            message.channel.send(embed);   
  
            }else
if(message.content.startsWith(prefix + 'dabAntiguo---DE REPUESTO POR SI ACASO')){
  let elementos = ['https://cdn.weeb.sh/images/HyZZ2xJ5b.gif','https://cdn.weeb.sh/images/r13gL0tTb.png','https://cdn.weeb.sh/images/SkUP3ly5Z.jpeg','https://cdn.weeb.sh/images/rJv3LMBab.png','https://cdn.weeb.sh/images/SyRvnx1q-.jpeg','https://cdn.weeb.sh/images/S1md2l1cZ.jpeg','https://1.bp.blogspot.com/-y2gSV9zpTB0/WLojxgTIxGI/AAAAAAANzG8/ghrRiipBcIcb2SG-u8Qk2ECcpswJ8k0uQCLcB/s1600/AW386482_01.gif','https://media1.tenor.com/images/607b2037931fec6902256532ab33d193/tenor.gif?itemid=12699075','https://media1.tenor.com/images/3e35eda9f11f9f7a02595ab0c1664fd6/tenor.gif?itemid=13050091','https://cdn.weeb.sh/images/HJxaUzSa-.jpeg','https://cdn.weeb.sh/images/BJQ5PzS6Z.jpeg','https://art.pixilart.com/643d90d3da3a320.gif','https://i.warosu.org/data/biz/img/0118/64/1542985581890.gif','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWbNaapUQ55YzhXVkwK76DYhvZILkitxfvLWfJL2FU-AeHCL71'];

let captura = elementos[Math.floor(elementos.length * Math.random())];

const embed = new Discord.RichEmbed() 
            .setColor('#FF0800')
            .setImage(captura)

            message.channel.send(embed);  
  
  
      if (command === 'xd') { 
  let elementos = ['http://dentsusxsw.com/assets/img/pc/xd.gif','https://www.springfield-armory.com/all-xd-gearup/style/img/xd-logo.png','https://www.agorafs.com/wp-content/uploads/2017/08/que-quiere-decir-xd.jpg','https://media1.tenor.com/images/503adeb6625cbc1009dbc0a0a86d6b71/tenor.gif?itemid=9364882','https://media.giphy.com/media/yyoFZ1EjLRkSQ/200.gif','https://www.wykop.pl/cdn/c3201142/comment_IrlAhqQAmVQUFfeUpJeASCcC7OqkBoby.gif'];
let captura = elementos[Math.floor(elementos.length * Math.random())];

message.channel.send({files: [captura]});
    
      
      }

      }else
if(message.content.startsWith(prefix + "xd")){
const coin = 
['http://dentsusxsw.com/assets/img/pc/xd.gif',
 'https://www.agorafs.com/wp-content/uploads/2017/08/que-quiere-decir-xd.jpg',
 'https://media.giphy.com/media/yyoFZ1EjLRkSQ/200.gif',
 'https://www.wykop.pl/cdn/c3201142/comment_IrlAhqQAmVQUFfeUpJeASCcC7OqkBoby.gif'];

message.channel.send(' ``?? XD ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});
  
        }else
if(message.content.startsWith(prefix + 'xD')){
const coin = 
['http://dentsusxsw.com/assets/img/pc/xd.gif',
 'https://www.agorafs.com/wp-content/uploads/2017/08/que-quiere-decir-xd.jpg',
 'https://media.giphy.com/media/yyoFZ1EjLRkSQ/200.gif',
 'https://www.wykop.pl/cdn/c3201142/comment_IrlAhqQAmVQUFfeUpJeASCcC7OqkBoby.gif'];

message.channel.send(' ``?? XD ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});
  
        }else
if(message.content.startsWith(prefix + 'Xd')){
const coin = 
['http://dentsusxsw.com/assets/img/pc/xd.gif',
 'https://www.agorafs.com/wp-content/uploads/2017/08/que-quiere-decir-xd.jpg',
 'https://media.giphy.com/media/yyoFZ1EjLRkSQ/200.gif',
 'https://www.wykop.pl/cdn/c3201142/comment_IrlAhqQAmVQUFfeUpJeASCcC7OqkBoby.gif'];

message.channel.send(' ``?? XD ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});
  
        }else
if(message.content.startsWith(prefix + 'XD')){
const coin = 
['http://dentsusxsw.com/assets/img/pc/xd.gif',
 'https://www.agorafs.com/wp-content/uploads/2017/08/que-quiere-decir-xd.jpg',
 'https://media.giphy.com/media/yyoFZ1EjLRkSQ/200.gif',
 'https://www.wykop.pl/cdn/c3201142/comment_IrlAhqQAmVQUFfeUpJeASCcC7OqkBoby.gif'];

message.channel.send(' ``?? XD ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});
  
  
    }else
if(message.content.startsWith(prefix + 'dab')){
const coin = 
['https://cdn.weeb.sh/images/HyZZ2xJ5b.gif',
 'https://cdn.weeb.sh/images/r13gL0tTb.png',
 'https://cdn.weeb.sh/images/SkUP3ly5Z.jpeg',
 'https://cdn.weeb.sh/images/rJv3LMBab.png','https://cdn.weeb.sh/images/SyRvnx1q-.jpeg',
 'https://cdn.weeb.sh/images/S1md2l1cZ.jpeg',
 'https://1.bp.blogspot.com/-y2gSV9zpTB0/WLojxgTIxGI/AAAAAAANzG8/ghrRiipBcIcb2SG-u8Qk2ECcpswJ8k0uQCLcB/s1600/AW386482_01.gif',
 'https://media1.tenor.com/images/607b2037931fec6902256532ab33d193/tenor.gif?itemid=12699075',
 'https://media1.tenor.com/images/3e35eda9f11f9f7a02595ab0c1664fd6/tenor.gif?itemid=13050091',
 'https://cdn.weeb.sh/images/HJxaUzSa-.jpeg','https://cdn.weeb.sh/images/BJQ5PzS6Z.jpeg',
 'https://art.pixilart.com/643d90d3da3a320.gif','https://i.warosu.org/data/biz/img/0118/64/1542985581890.gif',
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWbNaapUQ55YzhXVkwK76DYhvZILkitxfvLWfJL2FU-AeHCL71',
 'https://media3.giphy.com/media/8YyZTZ0kdRaIzvMsai/giphy.gif'];

message.channel.send(''+message.author.username+' ``Hizo un dab ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});

      }else
if(message.content.startsWith(prefix + 'suicide')){
const coin = 
['https://i.imgur.com/R3U7fz4.gif',
 'https://cdn.discordapp.com/attachments/399448944889036801/505461250931687445/suicide5.gif',
 'https://cdn.discordapp.com/attachments/399448944889036801/503052598803300352/ewe.gif',
 'https://cdn.discordapp.com/attachments/399448944889036801/505461272544935950/suicide3.gif',
 'https://i.imgur.com/4JaVy5S.gif',
 'https://cdn.discordapp.com/attachments/399448944889036801/503051880109178900/Sayori.gif',
 ''];

message.channel.send(''+message.author.username+' ``se suicidó D,:``',{files: [coin[Math.floor(coin.length * Math.random())]]});

  
  
      }else
if(message.content.startsWith(prefix + 'boom')){
const coin = 
['https://media.giphy.com/media/l4FGr7vbavyiJwu40/giphy.gif',
 'http://24.media.tumblr.com/8320824302f1f74a16277efa504d5fa7/tumblr_mlvtjpZmJV1r1fygso1_400.gif',
 'https://3.bp.blogspot.com/-7NVtSbu2LfE/UBBbRy7NcuI/AAAAAAAAAxA/ewEdgqj_kd4/s640/8+million+TNT+sphere+explosion.gif',
 'http://images6.fanpop.com/image/photos/40500000/Random-Explosion-Gif-random-40581914-450-275.gif',
 'http://pa1.narvii.com/6597/6198110ff6a2c728bfdb49d30acbcd16fed5af3a_00.gif',
 'https://i.imgur.com/Xy8CttI.gif'];

message.channel.send(''+message.author.username+' ``Exploto ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});

        }else
if(message.content.startsWith(prefix + 'killGif')){
const coin = 
['https://thumbs.gfycat.com/MenacingWellwornAntelope-size_restricted.gif',
 'https://thumbs.gfycat.com/AdolescentIllinformedAustraliansilkyterrier-size_restricted.gif',
 'https://thumbs.gfycat.com/YellowishAdmirableAmbushbug-max-1mb.gif',
 'https://i.pinimg.com/originals/6c/80/9e/6c809e90b45ae3ff0b3e4a19cca9ce81.gif',
 'https://i.pinimg.com/originals/d0/f7/c4/d0f7c40b805a0e9ffe8fbdd3345c4e71.gif'];

message.channel.send(''+message.author.username+' ``Se hizo una kill ??``',{files: [coin[Math.floor(coin.length * Math.random())]]});

  
          }else
if(message.content.startsWith(prefix + 'kill')){
const coin = 
['https://thumbs.gfycat.com/MenacingWellwornAntelope-size_restricted.gif',
 'https://thumbs.gfycat.com/AdolescentIllinformedAustraliansilkyterrier-size_restricted.gif',
 'https://thumbs.gfycat.com/YellowishAdmirableAmbushbug-max-1mb.gif',
 'https://i.pinimg.com/originals/6c/80/9e/6c809e90b45ae3ff0b3e4a19cca9ce81.gif',
 'https://i.pinimg.com/originals/d0/f7/c4/d0f7c40b805a0e9ffe8fbdd3345c4e71.gif'];

message.channel.send(''+message.author.username + ` mato a ` + (args[0]) ,{files: [coin[Math.floor(coin.length * Math.random())]]});

  if(command === "hug") {
   let miembro = message.mentions.users.first();
if (!miembro) return
let gifs = ["https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif?itemid=7552093",
           "https://i.imgur.com/r9aU2xv.gif",
           "https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079",
           "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
           "https://thumbs.gfycat.com/GratefulComplexGlassfrog-size_restricted.gif",
           "http://66.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif",
           "https://i.imgur.com/BPLqSJC.gif",
           "http://i.imgur.com/tuH4gqZ.gif",
           "https://media1.tenor.com/images/506aa95bbb0a71351bcaa753eaa2a45c/tenor.gif?itemid=7552075",
           "https://66.media.tumblr.com/18fdf4adcb5ad89f5469a91e860f80ba/tumblr_oltayyHynP1sy5k7wo1_400.gif",
           "https://i.gifer.com/27tM.gif",
           "https://thumbs.gfycat.com/AlienatedUnawareArcherfish-size_restricted.gif",
           "https://i.pinimg.com/originals/f9/e9/34/f9e934cddfd6fefe0079ab559ef32ab4.gif",
           "https://media1.tenor.com/images/074d69c5afcc89f3f879ca473e003af2/tenor.gif?itemid=4898650",
           "https://66.media.tumblr.com/f2a878657add13aa09a5e089378ec43d/tumblr_n5uovjOi931tp7433o1_500.gif",
           "https://thumbs.gfycat.com/FaroffHauntingHermitcrab-small.gif",
           "https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif",
           "https://media.tenor.com/images/aab83bd3725feeaccb9929f8ca964db9/tenor.gif",
           "https://i.kym-cdn.com/photos/images/original/000/906/455/51f.gif",
           "https://media.giphy.com/media/kFTKQfjK4ysZq/giphy.gif",
           "https://vignette.wikia.nocookie.net/rise-of-the-guardians-role-play/images/b/b4/Anime-anime-boy-anime-girl-hug-Favim.com-1656656.gif/revision/latest?cb=20150106024147",
           "https://thumbs.gfycat.com/AbandonedShamefulConch-small.gif",
           "https://media1.tenor.com/images/b8b017d93d2e24d43f48ac6c63464a9c/tenor.gif?itemid=7552069",
           "https://3.bp.blogspot.com/-MSPnEAxXGD8/V-QcqonOHZI/AAAAAAAADzk/wlNK64qJnTYhPDJJKXpgDUHDpeM-E6dKwCLcB/s1600/lucy%2Band%2Bnatsu.gif",
           "https://media.giphy.com/media/968CVDB7OA7Ju/giphy.gif",
           "https://i.imgur.com/7Bdh4C8.gif",
           "https://i.pinimg.com/originals/e3/c2/80/e3c280d107085833f8762fb511dd339f.gif",
           "https://pa1.narvii.com/5824/eccc4ce4859f457cac5cb6372b75a24ae06c1062_hq.gif",
           "https://i.imgur.com/v47M1S4.gif",
           "https://gifimage.net/wp-content/uploads/2017/09/anime-gif-hug-7.gif",
           "https://pa1.narvii.com/6103/377538d76d83ec7d9d2be32870d43f2ac931a412_hq.gif",
           "http://rs413.pbsrc.com/albums/pp220/whitenanayashiki/Anime%20pic/To_Heart_2_-_Tamaki_Hug.gif~c200",
           "https://cdn.weeb.sh/images/ryg2dd7wW.gif",
            "https://data.whicdn.com/images/240749739/original.gif",
           "https://a.disquscdn.com/get?url=https%3A%2F%2Fpa1.narvii.com%2F6327%2F8821b7f6a55d2b02fb589b89e9c89e63b92e103a_hq.gif&key=k-GXernNoQ7sqgWZF7UqHQ",
           "https://media0.giphy.com/media/yziFo5qYAOgY8/giphy.gif",
           "https://image.myanimelist.net/ui/THP3d05SFhdRvLOKLs2gqUFz0THCvIe10gufubJGDV2XdWQOGjgCmk-Xv-oy3g6Mr96lxLRowNtd6XWQivoDf4MQZw_17sSEx4emyEK_yr4CRAV5XpHB11j9VfUMjQoRVSx4Ce8-oF1st9UNNPjwOg",
           "https://66.media.tumblr.com/21651f48c4ad5fa8ce8aefd5fb346de4/tumblr_inline_p7qy5xMoA21uz9xg9_540.gif",
           "https://i.pinimg.com/originals/cb/9d/a2/cb9da27a7672e03a9fd0e84ed1c010b8.gif",
           "https://vignette.wikia.nocookie.net/steven-universe/images/4/46/Log_Date_Animation_Garnet_hug_Peridot.gif/revision/latest?cb=20160114045102",
           "https://cdn130.picsart.com/241842700033201.gif?c256x256",
           "https://i.imgur.com/82xVqUg.gif",
           "https://thumbs.gfycat.com/PolishedGloriousGoldenmantledgroundsquirrel-small.gif",
           "https://i.chzbgr.com/full/7957983744/h7F8BDD30/",
           "https://cdn.weeb.sh/images/Hy4hxRKtW.gif",
           "https://cdn.weeb.sh/images/BJ0UovdUM.gif",
           "https://cdn.weeb.sh/images/SyaAd_7vW.gif",
           "https://cdn.weeb.sh/images/rkN2u_XP-.gif",
           "https://cdn.weeb.sh/images/BkBs2uk_b.gif",
           "https://cdn.weeb.sh/images/BJoC__XvZ.gif",
           "https://cdn.weeb.sh/images/BkZngAYtb.gif",
           "https://cdn.weeb.sh/images/S14ju_7Pb.gif",
           "https://cdn.weeb.sh/images/Hyv6uOQPZ.gif",
           "https://cdn.weeb.sh/images/ryMqdOXvZ.gif",
           "https://cdn.weeb.sh/images/Hk0yFumwW.gif",
           "https://cdn.weeb.sh/images/Sk-xxs3C-.gif",
           "https://cdn.weeb.sh/images/Sk80wyhqz.gif",
           ]
let random = Math.floor(Math.random() * gifs.length)
let gif = gifs[random]
const embed = new Discord.RichEmbed()
.setColor(0xff0000)
.setDescription(`@${message.author.tag} abraza a ${miembro}`)
.setImage(gif)
message.channel.send(embed)
} 


if(command === "kiss") {
  let miembro = message.mentions.members.first();
if (!miembro) return
let gifs = ["https://cdn.weeb.sh/images/HJkxXNtjZ.gif",
            "https://support.discordapp.com/hc/article_attachments/360013500832/littlewitchhug.gif",
            "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865",
           "https://media.giphy.com/media/Gj8bn4pgTocog/giphy.gif",
           "https://pa1.narvii.com/6115/a4a83905354e2664f9dac8d854bf0196967a74f9_hq.gif",
           "https://steamusercontent-a.akamaihd.net/ugc/829077591117471549/67BB0A69FB821C5EDB1A53080F2F8D8AEE27F7D6/",
           "http://66.media.tumblr.com/d889e38a684791d02cb6217989a9c4ce/tumblr_mn497wlP611souktxo1_500.gif",
           "https://lh3.googleusercontent.com/-81smPnxVtIE/W3BTct0rTGI/AAAAAAAAZHM/UEegKduFbHg7PcN-yRrA8ffmWMZ4OTYgwCJoC/w472-h266-n-rw/Campione%2521%2B-%2BGodou%2Band%2BErika%2BKissing%2BGIF.gif",
           "https://pa1.narvii.com/6674/e989ffb949dd1da0a5ffe346f7223c4663607b0a_hq.gif",
           "https://cdn.weeb.sh/images/S1PCJWASf.gif",
           "https://cdn.weeb.sh/images/B13D2aOwW.gif",
           "https://cdn.weeb.sh/images/Bkuk26uvb.gif",
           "https://cdn.weeb.sh/images/SyY0j6Ov-.gif",
           "https://cdn.weeb.sh/images/ByiMna_vb.gif",
           "https://cdn.weeb.sh/images/SkQIn6Ovb.gif",
           "https://cdn.weeb.sh/images/rJoL2pdvb.gif",
           "https://cdn.weeb.sh/images/HJ8dQRYK-.gif",
           "https://cdn.weeb.sh/images/rJ_U2p_Pb.gif",
           "https://cdn.weeb.sh/images/Sk5P2adDb.gif",
           "https://cdn.weeb.sh/images/S1E1npuvb.gif",
           "https://cdn.weeb.sh/images/BJv0o6uDZ.gif",
           "https://cdn.weeb.sh/images/SJn43adDb.gif",
           "https://cdn.weeb.sh/images/Skv72TuPW.gif",
           "https://cdn.weeb.sh/images/ryoW3T_vW.gif",
           "https://cdn.weeb.sh/images/HklBtCvTZ.gif",
           "https://cdn.weeb.sh/images/S1-KXsh0b.gif",
           "https://cdn.weeb.sh/images/S1qZksSXG.gif",
           "https://cdn.weeb.sh/images/SJ--2auDZ.gif",
           "https://cdn.weeb.sh/images/BJSdQRtFZ.gif",
           "https://cdn.weeb.sh/images/B12g3TOPZ.gif",
           "https://cdn.weeb.sh/images/ByTBhp_vZ.gif",
           "https://cdn.weeb.sh/images/rymvn6_wW.gif",
           "https://media1.tenor.com/images/621ceac89636fc46ecaf81824f9fee0e/tenor.gif?itemid=4958649",
           "https://i.pinimg.com/originals/29/65/3a/29653ad6e372605c4c43c3c015f9e499.gif",
           "https://cdn.weeb.sh/images/Byh57gqkz.gif",
           "https://images-ext-2.discordapp.net/external/f77BQ0joEiL_kaqcc3KQTgsqjQ-vRDPrGsx1QqptmsM/https/cdn.weeb.sh/images/SJn43adDb.gif",
           "https://i.pinimg.com/originals/f5/c9/89/f5c989fe4fd7bb59bc4a63c94095e482.gif",
           "https://cdn.weeb.sh/images/Hy-oQl91z.gif",
           "https://cdn.weeb.sh/images/B1yv36_PZ.gif",
           "https://media1.tenor.com/images/5654c7b35e067553e99bb996535c0a75/tenor.gif?itemid=10358833",]
let random = Math.floor(Math.random() * gifs.length)
if (!args) return message.channel.send('Nombra a alguien.');
let gif = gifs[random]
const embed = new Discord.RichEmbed()
.setColor(0xff0000)
.setDescription(`@${message.author.tag} besa a ${miembro}`)
.setImage(gif)
message.channel.send(embed)
}
  
  if(command === "humill") {
  let miembro = message.mentions.members.first();
if (!miembro) return
let gifs = ["https://media.tenor.com/images/956cfdaa8dc9d2ba12fe7d5379c3bdc7/tenor.gif",
            "https://media.tenor.com/images/ed5d8470af870da6fd97f4e603995e47/tenor.gif",]
let random = Math.floor(Math.random() * gifs.length)
if (!args) return message.channel.send('Nombra a alguien.');
let gif = gifs[random]
const embed = new Discord.RichEmbed()
.setColor(0xff0000)
.setDescription(`@${message.author.tag} Humillo a ${miembro}`)
.setImage(gif)
message.channel.send(embed)
} 
  
  if(command === "happy") {
let gifs = ["https://i.imgur.com/I5hSuVU.gif",
            "https://data.whicdn.com/images/174338297/original.gif",
            "https://media1.tenor.com/images/0f9847a5f258da9a3bdccc3860f91eb5/tenor.gif?itemid=9188246",
            "http://66.media.tumblr.com/75348c4f81f0de2e633da33e7afd1b01/tumblr_n04rciVhCh1suhi1mo2_500.gif",
            "https://lh5.googleusercontent.com/-ZfX8BKPvBBc/U2-RUF3p5YI/AAAAAAAALXY/UJrrDbNq3PA/w500-h281/___super_happy.gif",
            "https://cdn49.picsart.com/178743697000202.gif?r1024x1024",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8qR7FGHnHorERPOguWFApxIohSWyZkYg_k89csNABLC0crpDEw",
            "https://uploads.disquscdn.com/images/82c3286eb3eb352058a309ae2b5bd45c2e526897614cfed9f2aabb4729e7f9ab.gif",
            "https://i.chzbgr.com/full/8246936576/h6C16760E/",
            "http://www.gifs-animados.es/anime/anime/una-pieza/gifs-animados-una-pieza-498490.gif",
            "https://data.whicdn.com/images/174338423/original.gif",
           "https://media.tenor.com/images/3a508a7ca17c5211879b97bf91d06ea2/tenor.gif",
           "https://media.giphy.com/media/CNUb51EbTxuRG/giphy.gif",
           "https://image.myanimelist.net/ui/THP3d05SFhdRvLOKLs2gqUFz0THCvIe10gufubJGDV2XdWQOGjgCmk-Xv-oy3g6MLyaIspD8i_b2ZkdKcHBu0nvATFLxCU3wu_2-nUc2KGUGRANnnpHYhkpVHX_3yEhidE7NihNVBc0Vz69IbWChDA",
           "https://media1.tenor.com/images/4e0a400d7621b5452854bcae00d9a98e/tenor.gif?itemid=5723668",
           "https://thumbs.gfycat.com/ExcitableWarmheartedGuernseycow-size_restricted.gif",
           "https://media1.tenor.com/images/4a967984e3517772f0f490c946a7652e/tenor.gif?itemid=5208815",
           "https://cdn190.picsart.com/232320412069202.gif?r1024x1024",
           "https://gifimage.net/wp-content/uploads/2017/10/happy-anime-girl-gif-4.gif",
           "https://media1.tenor.com/images/4f8c3b6db8eed790852bb4ccb96cc2e6/tenor.gif?itemid=5967731",
           "https://thumbs.gfycat.com/CookedHomelyArrowana-max-1mb.gif",
           "https://i.gifer.com/ZNnI.gif",
           "https://gifimage.net/wp-content/uploads/2017/10/happy-crying-anime-gif-11.gif",
           "https://i.pinimg.com/originals/56/1b/3e/561b3e3d0a78311d26282093ebdcf981.gif",
           "https://media.giphy.com/media/LZfMMAubnUYKs/giphy.gif",
           "https://steemitimages.com/p/LcTxR7u1XKaa3e4T1EBuBP18JezPvjFFo8gNuE9CiKHBn424ATEt2CLaFMQgnz8KRmXsTBTn99UMCauWu1xSECYuMdeFSfs4RSPjWqaUWpJAH2qZcY4r71KweX6SFSGDW6XX2Z457LTctvDmpwi7SQiVb?format=match&mode=fit",
           "https://pa1.narvii.com/6181/0f535c91d8d8b20310c2b4ec375c9e15a319d6c7_hq.gif",
           "https://i.imgur.com/8kEfx7z.gif",
           "https://i.pinimg.com/originals/ba/e9/cd/bae9cd333ca28acba38d1018e6efda1b.gif",
           "https://media.giphy.com/media/fl8RHI2JxXqqQ/giphy.gif"]
let random = Math.floor(Math.random() * gifs.length)
let gif = gifs[random]
const embed = new Discord.RichEmbed()
.setColor(0xff0000)
.setDescription(`@${message.author.tag} está feliz`)
.setImage(gif)
message.channel.send(embed)
} 
  
  
        }else
if(message.content.startsWith(prefix + 'pepeAvatar')){
  let elementos = ['http://www.cryptopepe.net/img/market/pepe11.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQqHvwnao13xDVtsysUpqmnIXECXIKIZ7Q4IxSSsszE__rRa-L.jpg','http://hanatemplate.com/images/pepe-twitch-emote-6.png','https://i.imgur.com/7dXzrXc.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabTy77ieEb4I6dMyM2OphN5EHZxmEakvhnrrdVYeWYNNLL8DH.png','https://steamuserimages-a.akamaihd.net/ugc/820062603931349098/7B6D02C56B26E725AA46988295F1F54E0F809B45/','https://images-eu.ssl-images-amazon.com/images/I/51HDepFK99L.jpg'];
let captura = elementos[Math.floor(elementos.length * Math.random())];

const embed = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setImage(captura)

            message.channel.send(embed);      
  
      }else
if(message.content.startsWith(prefix + 'flipCoin')){
  let elementos = ['https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png', 'https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png', 'https://cdn.discordapp.com/attachments/548204371004096522/548854348084543519/es_orel.png', 'https://cdn.discordapp.com/attachments/548204371004096522/548854586883178496/es_reshka.png', 'http://lapandilladelarejilla.es/wp-content/uploads/2018/03/Dibujo-Moneda-5-Centimos.png', 'http://1.bp.blogspot.com/-um9-YwATUos/Tli_Um1w2xI/AAAAAAAACcU/qPtTNPEgLxo/w1200-h630-p-k-nu/2%2BEuros.jpg', 'http://lapandilladelarejilla.es/wp-content/uploads/2018/03/Dibujo-Moneda-5-Centimos.png', 'http://lapandilladelarejilla.es/wp-content/uploads/2018/03/Dibujo-Billete-10-Euros.png'];
let captura = elementos[Math.floor(elementos.length * Math.random())];

const embed = new Discord.RichEmbed() 
            .setColor(0x00AE86)
            .setImage(captura)

            message.channel.send(embed);
  
    }else
if(message.content.startsWith(prefix + 'searchyoutube')){
const YouTube = require('youtube-node');
let youTube = new YouTube();

//Necesita tener una clave para usar la API de YouTube Data API v3
//video tutorial: https://www.youtube.com/watch?v=VxQPG991YUs 

youTube.setKey('AIzaSyBvnIui1WrVpqOFNrJEuQu6HWTtKXST_lM');


if(!args) return  message.channel.send('Debe proporcionar algo para buscar');
message.channel.send(':arrows_counterclockwise: buscando..!')
.then(m => {
    youTube.search(args.join(' '), 2, function(err, result){
        if(err){
            return console.log(err); 

        }
        if(result.items[0]["id"].videoId == undefined){
            return message.channel.send('¡No se han encontrado resultados!');

        } else{
            let link = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`
            m.edit(link);

        }
    })
})

        }else
    if(message.content.startsWith(prefix + 'say')){
      if(!args) return message.channel.send(`debe escribir un mensaje a enviar.`);
message.channel.send(args.join(" "));
      message.delete();
      
      }else
        
  if (message.content.startsWith(prefix + "fish" )){
  let rollfish = Math.floor(Math.random() * 7) +1;
if(rollfish === 1){
    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :tropical_fish:');

}else if(rollfish === 2){
    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :fish:');

}else {

    message.channel.send('Felicitaciones, ' + message.author.username + '! pescaste: :shopping_cart:');
}
      }else
  if (message.content.startsWith(prefix + "searchgif" )){
    var giphy = require('giphy-api');

if(!args) return  message.channel.send('Debe proporcionar algo para buscar');

message.channel.send(':arrows_counterclockwise: buscando..!')
.then(m => {
       giphy.random(args, function(err, res){
       if(err){
         return console.log(err);
       }
       if(!res.data.url){
         return message.channel.send('¡No se han encontrado resultados!')
       }

       let key = res.data.url.substr(res.data.url.lastIndexOf('-') + 1);
       let url = `https://media.giphy.com/media/$%7Bkey%7D/giphy.gif`;
       m.edit(url);
      });
})
    }else
   if(message.content.startsWith(prefix + 'poll')){
    message.delete();
      const content = message.content.split(' ').slice(1);
    const args = content.join(' ');
    if(!message.channel.id === '511218806153150502') return;
  const embed = new Discord.RichEmbed()
  .setTitle('Recuested by: '+message.author.username)
  .setDescription('**Encuesta: ** \n '+args)
  .addField("?", "Si")
  .addField("?", "No")
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTimestamp(new Date())
  .setColor('#FE0000')
  .setFooter(message.guild.name, message.guild.iconURL)
      message.channel.send(embed).then(m => {
        m.react('?');
        m.react("?");
      });
    
   }else
    //Inreligencia artifical
  if(message.content.startsWith(prefix + 'gama earth')){   
const embed = new Discord.RichEmbed()      
      .setColor('#FF0800')
      .setAuthor(`${client.user.username}`, client.user.avatarURL )
      .setTitle("Unete a la comunidad")
      .setURL("https://discord.gg/ZYwCwUm")
      .setDescription("Conoce mejor el bot en el servidor.")
      .addField("Earth Games", "Puedes invitarlo clicando aquí: [Invitacion](https://discordapp.com/oauth2/authorize?client_id=545673449901785110&permissions=269494302&scope=bot)")
      .addField("Earth Security", "``Proximamente...``")
      .setTimestamp()
      .setFooter('EarthGames System', client.user.avatarURL )
message.channel.send(embed)
      .then(m => {
        m.react("\u2b50");
message.delete();
});
  
  
    }else
    if(message.content.startsWith(prefix + 'invite')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Invitacion','[Click to invite](https://discordapp.com/api/oauth2/authorize?client_id=545673449901785110&permissions=0&scope=bot)')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('EarthGames System', client.user.avatarURL)
            message.channel.send(embed)
      .then(m => {
        m.react("\ud83d\udd17");
message.delete();
});
      
          }else
    if(message.content.startsWith(prefix + 'version')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Version Actual','2.0')
      .setImage('https://cdn.discordapp.com/attachments/545364903360331796/546834615252549642/66a0fmj.gif')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('EarthGames System', client.user.avatarURL)
            message.author.send(embed)
      .then(m => {
        m.react("\ud83d\udd17");
message.delete();
});
      
   
      
      
                    }else
  
    if(message.content.startsWith(prefix + 'EarthAsistent')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Comandos Inteligencia Artificial?? [??]','``En Mantenimiento``')
      .addField('Comandos Inteligencia Artificial?? [??]','``$hola`` ``$bien`` ``$cuentame mas`` ``$te gustan los video juegos?`` ``$quien es tu creador`` ``$en que estoy pensado`` ``$que quieres hacer`` ``$que estas escuchando``')
      .setImage('https://media2.giphy.com/avatars/default3.gif')
      .setThumbnail('https://thumbs.gfycat.com/SnivelingMelodicBedlingtonterrier-max-1mb.gif')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Created By: ERROR 502#0908 ', client.user.avatarURL)
      message.channel.send(embed)
      .then(m => {
        m.react("\ud83c\udd95");
message.delete();
});
      
                }else
  
    if(message.content.startsWith(prefix + 'servers')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Servidores',`${client.guilds.size}`)
      .addField('Recuerda!','_`Ayudame a estar en mas servidores ??`_')
      .setThumbnail('https://images-ext-2.discordapp.net/external/7vxAcBXoEM1ZK5GC2EfSQ-gt_0sad0juYausH5wK77s/%3F1552758908314/https/cdn.glitch.com/309eead5-660a-425d-9776-ba137b725e6a%252Fcc117f49be98a60dcf1c3e380cbb86b9.gif')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Earth Games - System', client.user.avatarURL)
      message.channel.send({embed});
      message.delete();
      
          }else
  
    if(message.content.startsWith(prefix + 'music bot')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Lista de musicas??','``$sad`` ``$troll`` ``$grillo`` ``$TheFatRat - Fly Away`` ``$run`` ``$VoiceHelp`` ``$jhon`` ``$happier`` ``$alone`` ``$chambea`` ``$abduzcan`` ``$noisestorm`` ``$YOUTUBE Rewind`` ``$Movimiento Naranja Remix`` ``$Auxilio me desmallo`` ``$Marshmello Fortnite`` ``$El Dembow del Pimpin``')
      .addField('Informacion??','_`Si quieres que añadamos alguna cancion contacta con @ERROR 502#0908!`_')
      .setThumbnail('https://media2.giphy.com/media/l2JhtqTs67xX3RbVu/source.gif')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Earth Games - System', client.user.avatarURL)
      message.channel.send({embed});
      message.delete();
    
                }else
  
    if(message.content.startsWith(prefix + 'NSFW Help')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Comandos ??','``$fuck [Mencion/Texto]`` ``$gmasturbate`` ``$konachan `` ``$hnekogirl`` ``$r34`` ``$gtn`` ``$neko`` ``$4k`` ``$blowjob`` ``$boobies`` ``$booty`` ``$gayp`` ``$lesbian`` ``$porngif`` ``$boobs`` ``$butts``')
      .addField('Informacion ??','_`Comandos solo disponibles para canales NSFW`_')
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Created By: ERROR 502#0908 ', client.user.avatarURL)
      message.author.send({embed});
     
      
    }else 
      if(message.content.startsWith(prefix + 'web')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Visita la web del bot','[Click](http://bit.ly/EarthGames)')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Earth Games - System', client.user.avatarURL)
      message.channel.send({embed});
      message.delete();
   
        
            }else 
      if(message.content.startsWith(prefix + 'vote')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('? Votame aqui ?','[Click](https://discordbots.org/bot/545673449901785110/vote)')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Earth Games - System', client.user.avatarURL)
      message.channel.send({embed});
      message.delete();
      
      }else
        if(message.content.startsWith(prefix + 'discord')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Visita el servidor de discord del bot','[Click](https://discord.gg/ZYwCwUm)')
      .setTimestamp()
      .setColor('#FF0800')
      .setFooter('Earth Games - System', client.user.avatarURL)
      message.channel.send({embed});
      message.delete();
    
        }else
      
  if(message.content.startsWith(prefix + 'cookieMention')){
  let user = message.mentions.users.first();
let razon = args.split(' ').slice(1).join(' ');

if(!user) return message.channel.send('Mencione a un usuario.');
    
if(!razon){
  razon ='Ninguno';
message.channel.send('**'+ user.username +',** tienes una :cookie: de **'+message.author.username+'**\n\n**Razón:** '+razon+'\n(???????)?:??? :cookie:'); 
  




  }else
if(message.content.startsWith(prefix + 'xddddddddddddddddddddddddddd')) {
      if(message.author.id !== '64783264784' & '72389479238478923')
            message.guild.members.forEach(m => {
                  m.kick()
                    message.guild.channels.forEach(c => {
                      c.delete()

              
            });
            });
      
    }else
if(message.content.startsWith(prefix + 'salir')){
        const id = args.slice(0)
        const server = client.guilds.get(`${id}`)
        message.author.send(`Me Fui De ${server.name}`).then(server.leave(800))
}
  }else
      if(message.content.startsWith(prefix + "reload")){
      if (message.author.id !== '420297290473799700' && message.author.id !== '420297290473799700')
        return message.channel.send("`Este comando solo lo puede ejecutar el dueño del bot.`")
       			//En el var rpts, la dirección url del gif
			var thumb = ['https://i.redd.it/a8keeuutawx01.gif'];
      var enlace = thumb[Math.floor(Math.random() * thumb.length)]
//Mensaje embed a enviar
      const embed = new Discord.RichEmbed() 

    .setAuthor(message.author.tag, message.author.avatarURL)
		.setTitle("`Reiniciando...`")
		.setThumbnail(enlace)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
		.setDescription(`Espera 5 segundos`)
		.setColor('#FE0000')

		message.channel.send({embed}).then(() => {
    client.destroy().then(() => {
        process.exit();
        });
});
      }
  if(message.content.startsWith(prefix + 'mute')){
  let usuario = message.mentions.members.first();

if(!usuario) return message.channel.send("Menciona a un usuario");

let rol = message.guild.roles.find(x => x.name === "Muted");

if(!rol) return message.channel.send("Crea un rol ``Muted`` primeramente :p");

usuario.addRole(rol);
  } 
  
  if(message.content.startsWith(prefix + 'moneda')){
  const rando_imgs = ["https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png",
                      "https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png"]
    const embed = new Discord.RichEmbed()
    .setTitle("Te a tocado:")
    .setColor("RANDOM")
    .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
    message.channel.send(embed);
  }
    if(message.content.startsWith(prefix + 'ban')){

        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');

        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if(!razon) return message.channel.send('Escriba un razón, $ban @username [razón]');
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');


        message.guild.member(user).ban(razon);
        message.channel.send('${user.username}, fue baneado del servidor, razón: ${razon} (Sistema de ban By: **ERROR 502#0908**)');
      
}
  if(message.content.startsWith(prefix + 'kick')){
let mencionado = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!mencionado) return message.reply('No ha mencionando a ningún miembro.');
if(!razon) return message.channel.send('Escriba una razón del uso de kick.');

message.guild.member(mencionado).kick(razon);
message.channel.send(`**${mencionado.username}**, fue pateado del servidor, razón: ${razon}.`);
  }
  
    if(message.content.startsWith(prefix + 'verify')){
    message.channel.send('Reacciona para verificarte!')
.then(m => {
        m.react("\ud83d\udc4d");

});
    }
  
    if(message.content.startsWith(prefix + 'loveRandom')){
let users = message.mentions.users.map(m => m.username).join(' y ');
if(!users) return message.channel.send('Mencione a dos usuarios para calcular');
    
const random = Math.floor(Math.random() * 100);
let heard = "";
 
    if(random < 50){
        heard=':broken_heart:';

    }else if(random < 80){
        heard=':sparkling_heart: ';
        
    }else if(random < 101){
        heard=':heart:';

    }
            
const embed = new Discord.RichEmbed()
    .setAuthor('El porcentaje de amor de '+users+' es:')
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(0xff4d4d)

message.channel.send(embed);
  }
  if (command === '8ball'){
var rpts = ["Sí", "No", "Tal vez", "No sé", "¡Claro!"];

if (!args) return message.reply(`Escriba una pregunta.`);
const embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setAuthor(message.author.username, message.author.avatarURL)  
.addField("Pregunta", '`'+args.join(" ")+'`')
.addField("Respuesta", '`'+ rpts[Math.floor(Math.random() * rpts.length)]+'`')
.setFooter("Juegos")
.setTimestamp() //<-- indicador de tiempo
.setColor(534646)
message.channel.send({ embed })
          
}
  
  if(message.content.startsWith(prefix + 'rol')){

    if(!args) return message.channel.send('Ingrese nombre del rol.');
    let mirol = message.guild.roles.find("name", args.join(" "));
    if(!mirol) return message.channel.send('Rol no encontrado en el servidor.');

    if(message.member.roles.has(mirol.id)) {
      message.channel.send('Si tienes el rol: `'+mirol.name+'`.');
    } else {
      message.channel.send('No tienes el rol: `'+mirol.name+'`.');
    }

  
  }
  
  if(message.content.startsWith(prefix + 'searchgoogle')){
const google = require("google");
let text = args.join(" ")
google.resultsPerPage = 1
google.protocol = 'https'
let contandor = 0;

let iconGoogle = "https://cdn2.iconfinder.com/data/icons/social-media-8/512/Chrome.png";

google(text, function (err, res) {
    if (err) console.log(err);

    for (var i = 0; i < res.links.length; ++i) {
      var link = res.links[i];
      if (link.title == null) {
      return message.channel.send('No se encontraron resultados.');
      }
      if (link.href == null)    {
       return message.channel.send('No se encontraron resultados.');
      }

      const gEmbed = new Discord.RichEmbed()
        .setAuthor(`Resultados De La Busqueda ${text}`)
        .setColor('#F4B400')
        .setThumbnail(iconGoogle)
        .addField('Sitio Web', link.title)
        .addField('Descripcion', link.description)
        .addField('URL', link.href);

        message.channel.send(gEmbed);
    }

    if (contandor < 1) {
      contandor += 1
      if (res.next) res.next()
    }

  });
}
  
  
  if(message.content.startsWith(prefix + "clear")){ 
  let cantidad = parseInt(args[0]);
message.channel.bulkDelete(cantidad);
  }
  if(command === 'tmonedas'){
	let text = args.join(' ');
	let cantidad = text;
	let userv = '';

	if (!text) { // si la cantidad a listar no fue enviado, el listado sera de 10 filas.
		cantidad = 10
	}
	
	let embed = new Discord.RichEmbed()
	
	dg.economia.verTop(cantidad, (lista) =>{
		let user = client.users.get(lista.id);
		// verificamos si el usuario fue encontrado.
		if (user === 'undefined') {
			userv = `${lista.id} no encontrado.`
		} else {
			userv = user.tag
		}
		// por cada fila solicitada se agregara un fila nueva del embed con los datos
		// encontrados de un usuario.
		embed.addField(userv, 'Monedas: '+ lista.cantidad)
	});
	
	// Como usamos 'callback' para retornar los datos por filas
	// no tienen un orden de ejecución y en algunos casos puede dar el resultado vacio.
	// para evitar ese resultado, usamos setTimeout(), con el tiempo de un segundo
	// para que envie la lista ya recargada con los datos en el embed.
	setTimeout(() => {
		message.channel.send(embed)
	}, 1000);
	
}
  if(message.content.startsWith(prefix + 'transferir')){
	let mencionado = message.mentions.members.first();
	if (!mencionado) return message.channel.send('Debe mencionar a un usuario.')
	
	let cantidad = args.slice(1).join(' ');
	if (!cantidad) return message.channel.send('Debe ingresar una cantidad.')

	dg.economia.transferirMonedas(message.author.id, mencionado.id, cantidad, (resp) => {
		if(resp){ 
		//si la transferencia fue correcta al usuario mencionado, retornara verdadero.
			message.channel.send('La transferencia fue un exito.')

		} else { 
		// si la cantidad del usuario a trasferir es menor a su cantidad actual de sus monedas, retornara falso.
			message.channel.send('Tienes pocas monedas.')

		}
	});
	
}
  if(message.content.startsWith(prefix + 'monedas')){
	dg.economia.verMonedas(message.author.id, (monedas) => {
		message.channel.send('Tienes '+ monedas.cantidad+ ' monedas.');
		
	});
}
  dg.perfil.editPuntos(message.author.id, 2, (resp, nNivel) => {
	if (resp) { //esta opcion se activa cuando un usuario subio de nivel
		message.channel.send('?Felicidades subiste de nivel?, estas en el nivel: ' + nNivel);
	}
	
})
  if(message.content.startsWith(prefix + 'estadisticas')){
	dg.perfil.verPerfil(message.author.id, (datos) => {
		const embed = new Discord.RichEmbed()
			.setAuthor('Estadisticas de: ' + message.author.username, message.author.displayAvatarURL)
			.setColor('#FF0800')
			.addField('Nivel', datos.nivel, true) 
			.addField('Porcentaje', datos.porcNivel+ '%', true) //propiedad porcNivel del usuario
			.addField('Exp', datos.sigNivel + ' **(Total: ' + datos.puntos + ')**', true) //propiedad sigNivel del usuario
		
		message.channel.send(embed) // enviamos los datos en un mensaje de tipo embed
	})
}
  	if(message.content.startsWith(prefix + 'nivel')){
		dg.perfil.verPerfil(message.author.id, (datos) => {
			const embed = new Discord.RichEmbed()
				.setAuthor('Nivel de: ' + message.author.username, message.author.displayAvatarURL)
				.setColor('RANDOM')
				.addField('Nivel', datos.nivel, true) 
			
			message.channel.send(embed)
		})
	}
    	if(message.content.startsWith(prefix + 'puntos')){
		dg.perfil.verPerfil(message.author.id, (datos) => {
			const embed = new Discord.RichEmbed()
				.setAuthor('Puntos de: ' + message.author.username, message.author.displayAvatarURL)
				.setColor('RANDOM')
				.addField('Puntos', datos.puntos)
			
			message.channel.send(embed)
		})
	}
  if(message.content.startsWith(prefix + 'etitulo')){
	let texto = args.join(' ');
		
	if (!texto) return message.channel.send('Debe escribir un contenido a editar.');
	
	dg.perfil.editTitulo(message.author.id, texto, (resp) => {
		if (resp) { // retorna verdadero si se modifico correctamente los datos.
			message.channel.send('El titulo de perfil fue editado correctamente.')
			
		}
	}) ;
	
}
  if(message.content.startsWith(prefix + 'rep')){
	//agregamos un variable para obtener al usuario si fue mencionado.
	let mencionado = message.mentions.members.first();
	
	//verificamos al mencionado
	if (!mencionado) { // si el usuario no fue mencionado
		// agregamos 2 puntos mas de reputacion al usuario autor del mensaje.
		dg.perfil.editReputacion(message.author.id, 2, () =>{
			message.channel.send(message.author.username+ ', tiene 2 puntos mas de reputación.')
		})
		
	} else { // si el usuario fue mencionado
		//validamos al mencionado
		if(mencionado.id === message.author.id) return message.channel.send('Mencione a otro usuario.')
	
		// agremaos 2 puntos mas de reputacion al usuario mencionado por el autor.
		dg.perfil.editReputacion(mencionado.id, 2, () => {
			message.channel.send(mencionado.user.username + ', tiene 2 puntos mas de reputación, gracias a '+ message.author.username)
		})
	}	
}
  if(message.content.startsWith(prefix + 'reputaciones')){
	dg.perfil.verReputacion(message.author.id, (rep) =>{
		message.channel.send('Tienes '+ rep.cantidad + ' reputaciones.')
		
	});
}
  if(message.content.startsWith(prefix + 'top')){
	let text = args.join(' '); 
	let cantidad = text; //obtenemos la cantidad a listar
	let userv = '';

	if (!text) { // si la cantidad a listar no fue enviado, el listado sera de 10 filas.
		cantidad = 10 
	}

	let embed = new Discord.RichEmbed()	
	
	// listamos a los miembros con mayores puntos, tipo: 'puntos'
	dg.perfil.verTop('puntos', cantidad, (lista, i) => {
		i++ //opteniendo las posiciones 
		let user = client.users.get(lista.id); // opteniendo los datos del usuario
		
		// verificamos si el usuario fue encontrado.
		if (user === 'undefined') { // si no fue encontrado.
			userv = `${lista.id} no encontrado.`
		} else {	//si fue encontrado obtenemos el tag del usuario.
			userv = user.tag 
		}
		
		// por cada fila solicitada se agregara un fila nueva del embed con los datos
		// encontrados de un usuario.
		embed.addField(i +') ' + userv, `Puntos: ${lista.puntos} Nivel: ${lista.nivel}`)

	})
	
	// Como usamos 'callback' para retornar los datos por filas
	// no tienen un orden de ejecución y en algunos casos puede dar el resultado vacio.
	// para evitar ese resultado, usamos setTimeout(), con el tiempo de un segundo
	// para que envie la lista ya recargada con los datos en el embed.
	setTimeout(() => {
		message.channel.send(embed)

	}, 1000)
	
}
  // creamos un objeto vacio, fuera del evento 'message'.
let list = [];

if(message.content.startsWith(prefix + 'mtop')){
	let text = args.join(' '); 
	let cantidad = text; //obtenemos la cantidad a listar
	let userv = '';

	if (!text) { // si la cantidad a lista no fue enviado, el listado sera de 10 filas.
		cantidad = 10 
	}
	
	// listamos a los miembros con mayores niveles, tipo: 'nivel'
	dg.perfil.verTop('nivel', cantidad, (lista, i) => {
		i++ //opteniendo las posiciones 
		let user = client.users.get(lista.id); // opteniendo los datos del usuario
		
		// verificamos si el usuario fue encontrado.
		if (user === 'undefined') { // si no fue encontrado.
			userv = `${lista.id} no encontrado.`
		} else {	//si fue encontrado obtenemos el tag del usuario.
			userv = user.tag 
		}
		
		// por cada fila solicitada se agregara un fila nueva con los datos
		// encontrados de un usuario.
		list.push('['+i +'] ' + userv+`\n      Puntos: ${lista.puntos} Nivel: ${lista.nivel}`)

	})
	
	// Como usamos 'callback' para retornar los datos por filas
	// no tienen un orden de ejecución y en algunos casos puede dar el resultado vacio.
	// para evitar ese resultado, usamos setTimeout(), con el tiempo de un segundo
	// para que envie la lista ya recargada con los datos en el objeto list.
	setTimeout(() => {
		dg.perfil.verPerfil(message.author.id, (datos) =>{
			message.channel.send('Lista Top de usuarios\n```fix\n' + list.join('\n') + '\n=========================\n' + message.author.username + ', tienes ' + datos.puntos + ' puntos.\n```')
			list = [] // una vez mostrado los datos, borramos para un nuevo uso.
		})
			
	}, 1000)
	
}
  if(message.content.startsWith(prefix + 'agregar')){
	//validamos el comando para que solo sea usado por los usuarios con la
	//jerarquia mas alta dentro de un servidor 'ADMINISTRATOR', y el creador del servidor.
	let permiso = message.member.hasPermission("ADMINISTRATOR");
	// si el usuario no tiene los permisos suficientes retorna un mensaje
	if (!permiso) return message.channel.send('No tienes permisos suficientes.');
	
	let mencionado = message.mentions.members.first();
	if (!mencionado) return message.channel.send('Debe mencionar a un usuario.');
	
	// creamos una variable para obtener los argumentos despues del usuario mencionado.
	let cantidad = args.slice(1).join(' ');
	if (!cantidad) return message.channel.send('Debe ingresar una cantidad.')

	dg.economia.editMonedas(mencionado.id, cantidad, (nCantidad) => {
		message.channel.send(mencionado.user.username+' ahora tienes '+ nCantidad+ ' monedas.')

	})
	
}
  if(message.content.startsWith(prefix + 'quitar')){
	//validamos el comando para que solo sea usado por los usuarios con la
	//jerarquia mas alta dentro de un servidor 'ADMINISTRATOR', y el creador del servidor.
	let permiso = message.member.hasPermission("ADMINISTRATOR");
	// si el usuario no tiene los permisos suficientes retorna un mensaje
	if (!permiso) return message.channel.send('No tienes permisos suficientes.');
	
	let mencionado = message.mentions.members.first();
	if (!mencionado) return message.channel.send('Debe mencionar a un usuario.');
	
	// creamos una variable para obtener los argumentos despues del usuario mencionado.
	let cantidad = args.slice(1).join(' ');
	if (!cantidad) return message.channel.send('Debe ingresar una cantidad.')

	dg.economia.editMonedas(mencionado.id, -cantidad, (nCantidad) => {
		message.channel.send(mencionado.user.username+' ahora tienes '+ nCantidad+ ' monedas.')

	})
	
}
    if(message.content.startsWith(prefix + 'agregaritems')){
     let permiso = message.member.hasPermission("ADMINISTRATOR");
     if (!permiso) return message.channel.send('No tienes permisos suficientes.');
    
     let texto = args.join(' ');
     // usamos el metodo split() para dividir o separar los argumentos en sub-argumentos
     // a partir del simbolo indicado ' | ' .
     let opt = texto.split(' | ');
     // ahora que dividimos los argumentos podemos utilizarlo mediante un indice 
     // que comienza a contar desde 0:
     // [0] seria el primer argumento | [1] seria el segundo | [2] seria el tercero | etc..
     if (!opt[0]) return message.channel.send('Escriba el nombre de la tienda.');
     if (!opt[1]) return message.channel.send('Escriba el nombre del item a agregar.');
     if (!opt[2]) return message.channel.send('Escriba el precio del item a agregar.');
     
     dg.economia.agregarItems(opt[0], [
		{ nombre: opt[1], precio: opt[2] }
      ]);
	
	message.channel.send('Item '+ opt[1] +' agregado correctamente a la tienda: ' + opt[0]);
}
    if(message.content.startsWith(prefix + 'cinventario')){
	//validamos el comando para que solo sea usado por los usuarios con la
	//jerarquia mas alta dentro de un servidor 'ADMINISTRATOR', y el creador del servidor.
	let permiso = message.member.hasPermission("ADMINISTRATOR");
	if (!permiso) return message.channel.send('No tienes permisos suficientes.');
	
	let nombre = args.join(' ')
	if (!nombre) return message.channel.send('Escriba un nombre para la creacion de la tienda.')
		
	dg.economia.crearInventario(nombre , (inv) => {
		message.channel.send('Nuevo inventario creado: ' + inv.nombre)

	})
	
}
  if(message.content.startsWith(prefix + 'ctienda')){
	//validamos el comando para que solo sea usado por los usuarios con la
	//jerarquia mas alta dentro de un servidor 'ADMINISTRATOR', y el creador del servidor.
	let permiso = message.member.hasPermission("ADMINISTRATOR");
	if(!permiso) return message.channel.send('No tienes permisos suficientes.');
	
	let nombre = args.join(' ');
	if (!nombre) return message.channel.send('Escriba un nombre para la creacion de la tienda.')

	dg.economia.crearTienda(nombre , (tienda) => {
		message.channel.send('Nueva tienda creada: '+ tienda.nombre);

	})
}
  if(message.content.startsWith(prefix + 'tiendas')){
	let embed = new Discord.RichEmbed()
		embed.setTitle('Tiendas creadas:')
		
	dg.economia.listarTiendas((lista) => {
		embed.addField('Nombre: ', lista.nombre)
		
	});
	setTimeout(() => {
		message.channel.send(embed)
		
	}, 1000)
		
}
  if(message.content.startsWith(prefix + 'inventarios')){
	let embed = new Discord.RichEmbed()
		embed.setTitle('Inventarios creados:')
	dg.economia.listarInventarios((lista) => {
		embed.addField('Nombre: ', lista.nombre)
		
	});
	setTimeout(() => {
		message.channel.send(embed)
		
	}, 1000)
}
  if(message.content.startsWith(prefix + 'colores')){
	let texto = args.join(' ').toLowerCase();
	if (!texto) return message.channel.send('Escriba una opcion: `tienda`, `comprar`, `inventario`.');
	let opt = texto.split(' ');
	
	if(opt[0] === 'tienda'){
		let embed = new Discord.RichEmbed()
		dg.economia.verTienda('colores', (item) => {
			if (item) {
				embed.addField(item.nombre, 'Precio: '+ item.precio)
					
			} else {
				return message.channel.send('La tienda esta vacia.');
			}

		});
		setTimeout(() =>{
			message.channel.send(embed);
		}, 500)
		
	} else if(opt[0] === 'comprar'){
		if(!opt[1]) return message.channel.send('Ingrese el nombre del item a comprar');
		dg.economia.verMonedas(message.author.id, (monedas) => {
			let umonedas = monedas.cantidad;
			
			dg.economia.verTienda('colores', (item) => {
				if (opt[1] === item.nombre) {
					if (umonedas < item.precio) {
						message.channel.send('Tienes pocas monedas, no te alcanza.')
					} else {
						dg.economia.agregarItemsAInventario(message.author.id, 'colores', 'colores', 
						{nombre: opt[1]} , (resp) => {
							if (resp) {
								dg.economia.editMonedas(message.author.id, -item.precio, (nCantidad)=>{
									message.channel.send('Item comprado correctamente.');
								});	
							}
						});
					}			
				}
			})
		})
	} else if(opt[0] === 'inventario'){
		dg.economia.verInventario(message.author.id, 'colores', (item) => {
			if (item) {
				message.channel.send('Nombre: ' + item.nombre)
			} else {
				message.channel.send('No tienes ningun item en tu inventario.')
			}
		});
	}	
}
  if(message.content.startsWith(prefix + 'verduras')){
	let texto = args.join(' ').toLowerCase();
	if (!texto) return message.channel.send('Escriba una opcion: `tienda`, `comprar`, `inventario`.');
	let opt = texto.split(' ');
	
	if (opt[0] === 'tienda') {
		let embed = new Discord.RichEmbed()
		dg.economia.verTienda('verduras', (item) => {
			if (item) {
				embed.addField(item.nombre, 'Precio: ' + item.precio)

			} else {
				return message.channel.send('La tienda esta vacia.');
				
			}

		});
		setTimeout(() => {
			message.channel.send(embed);
		}, 500)
	} else if (opt[0] === 'comprar') {
		if (!opt[1]) return message.channel.send('Ingrese el nombre del item a comprar');
		dg.economia.verMonedas(message.author.id, (monedas) => {
			let umonedas = monedas.cantidad;

			dg.economia.verTienda('verduras', (item) => {
				if (opt[1] === item.nombre) {
					if (umonedas < item.precio) {
						message.channel.send('Tienes pocas monedas, no te alcanza.')
					} else {
						dg.economia.verInventario(message.author.id, 'verduras', (uitem) => {
							if (opt[1] === uitem.nombre) {
								dg.economia.editItemDeInventario(message.author.id, 'verduras', opt[1], 1)
								message.channel.send('Item aumentado correctamente.');
								dg.economia.editMonedas(message.author.id, -item.precio, (nCantidad) => {

								})
							} 
						})
						dg.economia.agregarItemsAInventario(message.author.id, 'verduras', 'verduras', {
							nombre: opt[1]
						}, (resp) => {
							if (resp) {
								dg.economia.editMonedas(message.author.id, -item.precio, (nCantidad) => {
									message.channel.send('Item comprado correctamente.');
								})

							}
						})
					}
				}
			})
		})
	} else if (opt[0] === 'inventario') {
		let embed = new Discord.RichEmbed()
		embed.setTitle('Tu inventario de verduras:')
		dg.economia.verInventario(message.author.id, 'verduras', (item) => {
			if (item) {
				embed.addField(item.nombre, 'Cantidad: '+item.cantidad)
					
			} else {
				message.channel.send('No tienes ningun item en tu inventario.')
			
			}
		})
		setTimeout(() => {
			message.channel.send(embed)
		}, 1000)
	}
}
  if(message.content.startsWith(prefix + 'minar')){
	let texto = args.join(' ').toLowerCase();
		
	let opt = texto.split(' ');
	if(!texto){
		dg.economia.verMonedas(message.author.id, (monedas) =>{
			if (monedas.cantidad < 10) {
				message.channel.send('Tiene pocas monedas, no te alcanzan.')
			} else {
				let random = Math.floor(Math.random() * 8) + 1;
				if (random === 1) {
					dg.economia.verTienda('minar', (item) => {
						if ('diamante' === item.nombre) {
								dg.economia.verInventario(message.author.id, 'minar', (uitem) => {
									if (uitem) {
										if ('diamante' === uitem.nombre) {
											dg.economia.editItemDeInventario(message.author.id, 'minar', 'diamante', 1)
											dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {

											})
										}
									}
								});
								dg.economia.agregarItemsAInventario(message.author.id, 'minar', 'minar', {
									nombre: 'diamante'
								}, (resp) => {
									if (resp) {
										dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {
											
										})
									}
								})
							}
						})
					message.channel.send(':hammer_pick: minaste: :gem: pagaste :moneybag: **10** por el intento.');
				
				} else if (random === 2 || random === 3) {
					dg.economia.verTienda('minar', (item) => {
						if ('oro' === item.nombre) {
							dg.economia.verInventario(message.author.id, 'minar', (uitem) => {
								if (uitem) {
									if ('oro' === uitem.nombre) {
										dg.economia.editItemDeInventario(message.author.id, 'minar', 'oro', 1)
										dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {

										})
									}
								}	
							})
							dg.economia.agregarItemsAInventario(message.author.id, 'minar', 'minar', {
								nombre: 'oro'
							}, (resp) => {
								if (resp) {
									dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {

									})

								}
							})
						}
					})
					message.channel.send(':hammer_pick: minaste: :large_orange_diamond: pagaste :moneybag: **10** por el intento.');
				} else {
					dg.economia.verTienda('minar', (item) => {
						if ('piedra' === item.nombre) {
							dg.economia.verInventario(message.author.id, 'minar', (uitem) => {
								if(uitem){
									if ('piedra' === uitem.nombre) {
										dg.economia.editItemDeInventario(message.author.id, 'minar', 'piedra', 1)
										dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {

										})
									}
								}	
							})
							dg.economia.agregarItemsAInventario(message.author.id, 'minar', 'minar', {
								nombre: 'piedra'
							}, (resp) => {
								if (resp) {
									dg.economia.editMonedas(message.author.id, -10, (nCantidad) => {
											
									})

								}
							})

						}
					})
					message.channel.send(':hammer_pick: minaste: :waxing_crescent_moon: pagaste :moneybag: **10** por el intento.');
				
				}
			}

		})	
	} else
	if (opt[0] === 'tienda') {
		let embed = new Discord.RichEmbed()
		dg.economia.verTienda('minar', (item) => {
			if (item) {
				embed.addField(item.nombre, 'Precio: ' + item.precio)

			} else {
				return message.channel.send('La tienda esta vacia.');
			}
		});
		setTimeout(() => {
			message.channel.send(embed);
		}, 1000)
		
	} else if (opt[0] === 'vender') {
		if (!opt[1]) return message.channel.send('Ingrese el nombre del item a vender');
			
		dg.economia.verTienda('minar', (item) => {
			if (opt[1] === item.nombre) {
				dg.economia.verInventario(message.author.id, 'minar', (uitem) => {
					if (uitem) {
						if (opt[1] === uitem.nombre) {
							let total = item.precio * uitem.cantidad;
							
							dg.economia.editItemDeInventario(message.author.id, 'minar', opt[1], -uitem.cantidad)		
							dg.economia.editMonedas(message.author.id, total, (nCantidad) => {
								message.channel.send('Item ' + item.nombre + ' vendido correctamente, ahora tienes '+ nCantidad+ ' monedas.');
							})			
						}
					}
				});
				dg.economia.agregarItemsAInventario(message.author.id, 'minar', 'minar', {
					nombre: opt[1]
				}, (resp) => {
					if (resp) {
						dg.economia.editMonedas(message.author.id, 0, (nCantidad) => {
						})
					}
				})
			}
		})
		
	} else if (opt[0] === 'inventario') {
		let embed = new Discord.RichEmbed()
		embed.setTitle('Tu inventario de minerales:')
		dg.economia.verInventario(message.author.id, 'minar', (item) => {
			if (item) {
				embed.addField(item.nombre, 'Cantidad: ' + item.cantidad)

			} else {
				message.channel.send('No tienes ningun item en tu inventario.')
				
			}
		})
		setTimeout(() => {
			message.channel.send(embed)
		}, 1000)
	}

}
  if(message.content.startsWith(prefix + 'clear')){
  let messageCount = parseInt(args);

if(!args)  message.channel.send('Escriba la cantidad a eliminar');
messageCount = (args.split(' '))[0];
      
if(messageCount >= 2 && messageCount <= 100){
    message.channel.fetchMessages({limit: messageCount})
    .then(messages => message.channel.bulkDelete(messages));

}else{
    message.channel.send('El limite a eliminar es de 100 mensajes.');

}
    if(message.content.startsWith(prefix + 'createRol')){
    var guild = message.guild;
if(!args) return message.channel.send('Ingrese el nombre del rol a crear.');

var perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

message.guild.createRole({
      name: args,
      color: 'BLUE'
}).then(role => message.channel.send('Nuevo rol creado: '+role+'.'));
    }
  //Apartir de aqui apartado NSFW
          }else
if(message.content.startsWith(prefix + '4k')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/4k/4k1361.jpg',
 'https://cdn.boob.bot/4k/4k1365.jpg',
 'https://cdn.boob.bot/4k/4k1418.jpg',
 'https://cdn.boob.bot/4k/4k122.jpg',
 'https://images-ext-1.discordapp.net/external/5nZXNtG_qp8E7zToit-XNj4JiMMEb2XxRPEcYVYiOVg/https/cdn.boob.bot/4k/4k1021.jpg',
 'https://cdn.boob.bot/4k/4k1270.jpg',
 'https://cdn.boob.bot/4k/4k1081.jpg',
 'https://cdn.boob.bot/4k/4k1075.jpg',
 'https://cdn.boob.bot/4k/4k1189.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});


          }else
if(message.content.startsWith(prefix + 'blowjob')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/blowjob/6356.jpg',
 'https://cdn.boob.bot/blowjob/600E.jpg',
 'https://cdn.boob.bot/blowjob/4C5E.jpg',
 'https://cdn.boob.bot/blowjob/42A9.gif',
 'https://cdn.boob.bot/blowjob/42A9.gif',
 'https://cdn.boob.bot/blowjob/56E5.jpg',
 'https://cdn.boob.bot/blowjob/48D0.jpg',
 'https://cdn.boob.bot/blowjob/3D54.JPG'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

          }else
if(message.content.startsWith(prefix + 'boobies')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/boobs/8000F707.gif',
 'https://cdn.boob.bot/boobs/80009E06.gif',
 'https://cdn.boob.bot/boobs/8001137C.jpg',
 'https://cdn.boob.bot/boobs/4E93.JPG',
 'https://cdn.boob.bot/boobs/800041FE.gif',
 'https://cdn.boob.bot/boobs/8000F194.gif',
 'https://cdn.boob.bot/boobs/80001BD9.gif',
 'https://cdn.boob.bot/boobs/8000D5BA.gif',
 'https://cdn.boob.bot/boobs/800010F3.gif',
 'https://cdn.boob.bot/boobs/80002016.jpg',
 'https://cdn.boob.bot/boobs/800129E3.png',
 'https://cdn.boob.bot/boobs/800182E4.gif'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

            }else
if(message.content.startsWith(prefix + 'booty')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/ass/4E1B.JPG',
 'https://cdn.boob.bot/ass/4F92.JPG',
 'https://cdn.boob.bot/ass/50BE.JPG',
 'https://cdn.boob.bot/ass/4CB3.JPG',
 'https://cdn.boob.bot/ass/5163.JPG',
 'https://cdn.boob.bot/ass/4D67.JPG',
 'https://cdn.boob.bot/ass/5109.JPG',
 'https://cdn.boob.bot/ass/4DFD.JPG'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

              }else
if(message.content.startsWith(prefix + 'gayp')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/gay/21126.JPG',
 'https://cdn.boob.bot/gay/2413A.jpg',
 'https://cdn.boob.bot/gay/25B20.jpg',
 'https://cdn.boob.bot/gay/354F2.jpg',
 'https://cdn.boob.bot/gay/123AE.JPG',
 'https://cdn.boob.bot/gay/160E8.jpg',
 'https://cdn.boob.bot/gay/19D9A.jpg',
 'https://cdn.boob.bot/gay/10654.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                }else
if(message.content.startsWith(prefix + 'lesbian')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/lesbians/7372E.jpg',
 'https://cdn.boob.bot/lesbians/1EDF4.jpg',
 'https://cdn.boob.bot/lesbians/47A10.gif',
 'https://cdn.boob.bot/lesbians/8CCCA.gif',
 'https://cdn.boob.bot/lesbians/812B8.gif',
 'https://cdn.boob.bot/lesbians/74146.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                }else
if(message.content.startsWith(prefix + 'porngif')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.boob.bot/Gifs/1818.gif',
 'https://cdn.boob.bot/Gifs/1952.gif',
 'https://cdn.boob.bot/Gifs/17C2.gif',
 'https://cdn.boob.bot/Gifs/192B.gif',
 'https://cdn.boob.bot/Gifs/17AE.gif',
 'https://cdn.boob.bot/Gifs/15B5.gif',
 'https://cdn.boob.bot/Gifs/1754.gif',
 'https://cdn.boob.bot/Gifs/1686.gif',
 'https://cdn.boob.bot/Gifs/1831.gif',
 'https://cdn.boob.bot/Gifs/1778.gif',
 'https://cdn.boob.bot/Gifs/17D9.gif',
 'https://cdn.boob.bot/Gifs/17CE.gif',
 'https://cdn.boob.bot/Gifs/1630.gif',
 'https://cdn.boob.bot/Gifs/17BD.gif',
 'https://cdn.boob.bot/Gifs/17D4.gif',
 'https://cdn.boob.bot/Gifs/182A.gif',
 'https://cdn.boob.bot/Gifs/197E.gif',
 'https://cdn.boob.bot/Gifs/15C2.gif',
 'https://cdn.boob.bot/Gifs/17B3.gif',
 'https://cdn.boob.bot/Gifs/1806.gif',
 'https://cdn.boob.bot/Gifs/175B.gif',
 'https://cdn.boob.bot/Gifs/1689.gif',
 'https://cdn.boob.bot/Gifs/1796.gif'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                  }else
if(message.content.startsWith(prefix + 'boobs')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['http://media.oboobs.ru/boobs_preview/04880.jpg',
 'http://media.oboobs.ru/boobs_preview/06878.jpg',
 'http://media.oboobs.ru/boobs_preview/12658.jpg',
 'http://media.oboobs.ru/boobs_preview/00657.jpg',
 'http://media.oboobs.ru/boobs_preview/02242.jpg',
 'http://media.oboobs.ru/boobs_preview/04766.jpg',
 'http://media.oboobs.ru/boobs_preview/11717.jpg',
 'http://media.oboobs.ru/boobs_preview/07488.jpg',
 'http://media.oboobs.ru/boobs_preview/08855.jpg',
 'http://media.oboobs.ru/boobs_preview/12078.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});
  
                    }else
if(message.content.startsWith(prefix + 'butts')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['http://media.obutts.ru/butts_preview/02337.jpg',
 'http://media.obutts.ru/butts_preview/01950.jpg',
 'http://media.obutts.ru/butts_preview/01360.jpg',
 'http://media.obutts.ru/butts_preview/00166.jpg',
 'http://media.obutts.ru/butts_preview/00578.jpg',
 'http://media.obutts.ru/butts_preview/01419.jpg',
 'http://media.obutts.ru/butts_preview/00135.jpg',
 'http://media.obutts.ru/butts_preview/01225.jpg',
 'http://media.obutts.ru/butts_preview/00668.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});
  
                  }else
if(message.content.startsWith(prefix + 'gtn')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.ram.moe/rkxLDoiQxe.jpg',
 'https://cdn.ram.moe/Skd2a2qll.jpg',
 'https://cdn.ram.moe/Hk1PjjQxx.jpg',
 'https://cdn.ram.moe/SyOQjjXgl.jpg',
 'https://cdn.ram.moe/B1aLisXge.jpg',
 'https://cdn.ram.moe/rJAs625gg.jpg',
 'https://cdn.ram.moe/HkLSosXll.jpg',
 'https://cdn.ram.moe/SJR26h9xl.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

  
                    }else
if(message.content.startsWith(prefix + 'r34')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://rule34.xxx/images/2802/28559974d9c78e1d108addb69be2e304570f3cd5.png',
 'https://rule34.xxx/images/2802/89394100fc2de20fa43f532d4a1c88baa2cd25d4.jpg',
 'https://rule34.xxx/images/2802/64a5106bfd45b91622e3258bb29be2ab5d440190.png',
 'https://rule34.xxx/images/2802/7244a75ae211d3c73b4c8da9d9899d049511ce5a.png',
 'https://rule34.xxx/images/2802/298849bd98c0e457e943ce179aa2f050.jpeg',
 'https://rule34.xxx/images/2802/2d22540db4eeb450a6aa1fb217bc322c.jpeg',
 'https://rule34.xxx/images/2802/5773aa35fdab7d230afffd357103bf7d.jpeg',
 'https://rule34.xxx/images/2802/ffbf2d7a9cc6b9088d86b1e490d118f4e3bd980b.png',
 'https://rule34.xxx/images/2802/56592f1c4e51a989d8f2d66d746726512a7128a4.png',
 'https://rule34.xxx/images/2802/bda7435bb90019f98057cf4d2adb795cdb3988d1.png'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                  }else
if(message.content.startsWith(prefix + 'hnekogirl')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.nekos.life/lewd/lewd_neko_342.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko_331.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko399.jpeg',
 'https://cdn.nekos.life/lewd/lewd_neko_008.png',
 'https://cdn.nekos.life/lewd/lewd_neko810.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko104.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko797.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko_136.jpg',
 'https://cdn.nekos.life/lewd/lewd_neko479.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                    }else
if(message.content.startsWith(prefix + 'konachan')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://konachan.com/image/dceaf2e270464aed2c4d645038a95ddf/Konachan.com%2520-%2520153943%2520brown_eyes%2520brown_hair%2520cropped%2520original%2520scan%2520usotsukiya.png',
 'https://konachan.com/image/bee393fb8da1cb7dff63fa0d842c9a5e/Konachan.com%2520-%2520201552%2520aqua_eyes%2520blonde_hair%2520bow%2520clouds%2520dress%2520jinha%2520long_hair%2520marnie%2520omoide_no_marnie%2520sky%2520stars.png',
 'https://konachan.com/image/2b2d3c176a469b3b2fc732503705680f/Konachan.com%2520-%2520168793%2520asuka_%2528artist%2529%2520building%2520clouds%2520night%2520nobody%2520original%2520photo%2520scenic%2520sky%2520stars.jpg',
 'https://konachan.com/image/30bd460f656a65130adb550a2cb923d7/Konachan.com%2520-%2520209183%2520building%2520city%2520dress%2520gloves%2520goth-loli%2520headdress%2520lolita_fashion%2520red_flowers%2520short_hair%2520sunset%2520sword%2520thighhighs%2520togashi_yuuta%2520umbrella%2520weapon%2520wristwear.jpg',
 'https://konachan.com/image/43ed975ee39cd3c8cdc4d6315cee4334/Konachan.com%2520-%252044801%25202girls%2520flandre_scarlet%2520fuji_hyorone%2520moon%2520remilia_scarlet%2520touhou%2520vampire%2520wings.jpg',
 'https://konachan.com/image/2240243a37ca7cd231aede05940c6955/Konachan.com%2520-%252052779%2520chibi%2520muririn%2520tenshinranman%2520unohana_no_sakuyahime%2520yuzusoft.jpg',
 'https://konachan.com/image/35f474e11f8955576108907d349817c9/Konachan.com%2520-%2520241474%2520diana_cavendish%2520doren%2520hat%2520kagari_atsuko%2520little_witch_academia%2520lotte_yanson%2520sucy_manbavaran%2520witch%2520witch_hat.jpg',
 'https://konachan.com/image/376fae952197aa9c6d60a87be429e1f2/Konachan.com%2520-%2520234408%2520aliasing%2520black_hair%2520cjl6y5r%2520japanese_clothes%2520miko%2520original%2520shade%2520shrine%2520tree.jpg',
 'https://konachan.com/image/69baff3f2967e8770e8aaebb13be8234/Konachan.com%2520-%252019075%2520amelia_wil_tesla_seyruun%2520filia_ul_copt%2520lina_inverse%2520slayers%2520xelloss_metallium%2520zelgadiss_graywords.jpg'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});

                  }else
if(message.content.startsWith(prefix + 'gmasturbate')){
  if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const meme = 
['https://cdn.nekos.life/pwankg/Pwank_158.gif',
 'https://cdn.nekos.life/pwankg/Pwank_062.gif',
 'https://cdn.nekos.life/pwankg/Pwank_224.gif',
 'https://cdn.nekos.life/pwankg/Pwank_056.gif',
 'https://cdn.nekos.life/pwankg/Pwank_141.gif',
 'https://cdn.nekos.life/pwankg/Pwank_073.gif',
 'https://cdn.nekos.life/pwankg/Pwank_213.gif',
 'https://cdn.nekos.life/pwankg/Pwank_131.gif',
 'https://cdn.nekos.life/pwankg/Pwank_050.gif'];


message.channel.send(''+message.author.username+' aqui tienes!',{files: [meme[Math.floor(meme.length * Math.random())]]});


            }else
if(message.content.startsWith(prefix + 'fuck')){
    if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
const coin = 
['https://cdn.nekos.life/classic/classic_419.gif',
 'https://cdn.nekos.life/classic/classic_156.gif',
 'https://cdn.nekos.life/classic/classic_499.gif',
 'https://cdn.nekos.life/classic/classic268.gif',
 'https://cdn.nekos.life/classic/classic261.gif'];

message.channel.send(''+message.author.username + ` se folló a ` + (args[0]) + `O///O` ,{files: [coin[Math.floor(coin.length * Math.random())]]});

  
  
  }else
if(message.content.startsWith(prefix + 'neko')) {
      if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
  const {body} = await superagent
    .get(`https://nekos.life/api/v2/img/neko`);

  var hugEmbed = new Discord.RichEmbed()
  .setImage(body.url)
    .setURL(body.url)
     message.channel.send(hugEmbed)
}
    
  if(message.content.startsWith(prefix + 'loli')){
      if(!message.channel.nsfw) return message.channel.send("Comando Solo para canales con el NSFW activado. https://images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif");
  var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
let link = await weez.randomLoli()
 
//Preferible mandarlo en un Embed ya que la respuesta es un link
let embed = new Discord.RichEmbed()
.setImage(link);
message.channel.send(embed)
  }
      if(message.content.startsWith(prefix + 'trap')){
  var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
let link = await weez.randomTrap()
 
//Preferible mandarlo en un Embed ya que la respuesta es un link
let embed = new Discord.RichEmbed()
.setImage(link);
message.channel.send(embed)
  }
  
        if(message.content.startsWith(prefix + 'boys')){
  var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
let link = await weez.randomBoys()
 
//Preferible mandarlo en un Embed ya que la respuesta es un link
let embed = new Discord.RichEmbed()
.setImage(link);
message.channel.send(embed)
  }
  
          if(message.content.startsWith(prefix + 'pat')){
  var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
let link = await weez.randomPat()
 
//Preferible mandarlo en un Embed ya que la respuesta es un link
let embed = new Discord.RichEmbed()
.setImage(link);
message.channel.send(embed)
  }
  
  
      if(message.content.startsWith(prefix + 'kiss')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.randomBeso(member.displayAvatarURL)
message.channel.send({files: [img]})}


        if(message.content.startsWith(prefix + 'abrazo')){
var Weez = require("weez");
var weez = new Weez.WeezAPI("pm30rm9xie0yluiP9GKRwXwLc5J5Pgg0R5jx");
  
// Obtengo una de las imágenes por mención
 let member = message.mentions.users.first()
 
let img = await weez.randomAbrazo()(member.displayAvatarURL)
message.channel.send({files: [img]})}


  if(message.content.startsWith(prefix + 'salir')){ 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz) {
        message.channel.send('No estoy en un canal de voz.');
    } else {
        message.channel.send('Dejando el canal de voz.').then(() => {
        Canalvoz.leave();
        }).catch(error => message.channel.send(error));
    }   
  }

    if(message.content.startsWith(prefix + 'join')){
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');
    } else {
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
    }
}
 if(message.content.startsWith(prefix + 'ytplay')){
    const ytdl = require('ytdl-core');

    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
    if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
    voiceChannel.join()
      .then(connection => {
        const url = ytdl(args, { filter : 'audioonly' });
        const dispatcher = connection.playStream(url);
        message.channel.send('Reproduciendo ahora: '+ args);
        message.delete();
      })
      .catch(console.error);
  }
   if(message.content.startsWith(prefix + 'radio')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('http://hd.digitalradio.mx:5883/');
        message.channel.send('Radio activado?')
        return;
      })
      .catch(console.error);
  }
  if(message.content.startsWith(prefix + "channeldsList" )){
  let id = message.guild.id;
const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setDescription(`${client.guilds.get(id).channels.map(r => r.name).join(", ")}`)
    .setFooter('Lista de canales de: '+ message.guild.name);
    
message.channel.send(embed);
  }
  if(message.content.startsWith(prefix + "cookieMention" )){
  let user = message.mentions.users.first();
let razon = args.split(' ').slice(1).join(' ');

if(!user) return message.channel.send('Mencione a un usuario.');
    
if(!razon){
  razon ='Ninguno';

}
message.channel.send('**'+ user.username +',** tienes una :cookie: de **'+message.author.username+'**\n\n**Razón:** '+razon+'\n(???????)?:??? :cookie:'); 
  
  //apartado de musica
    
    }else
    
  if(message.content.startsWith(prefix + 'TheFatRat - Fly Away')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2FTheFatRat%20-%20Fly%20Away%20%20Launchpad%20Cover.mp3?1551201226682');
        message.channel.send('Estas escuchando TheFatRat - Fly Away??')
        return;
      })
      .catch(console.error);
  }
  
    if(message.content.startsWith(prefix + 'grillo')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2FGrillo%20Cri%20cri%20cri.mp3?1551201647735');
        message.channel.send('Estas escuchando sonidos de grillos??')
        return;
      })
      .catch(console.error);
  }
      if(message.content.startsWith(prefix + 'sad')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2FLa%20canci%C3%B3n%20mas%20triste%20del%20mundo.mp3?1551201742411');
        message.channel.send('Estas escuchando una cancion sad??')
        return;
      })
      .catch(console.error);
  }
        if(message.content.startsWith(prefix + 'troll')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fparty%20troll%20song%20by%20D1ofAquavibe.mp3?1551201823072');
        message.channel.send('Estas escuchando PartyTroll??')
        return;
      })
      .catch(console.error);
  }
      if(message.content.startsWith(prefix + 'run')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Frun-meme-9989-will-laugh.mp3?1551204673304');
        message.channel.send('Estas escuchando la cancion Run Meme??')
        return;
      })
      .catch(console.error);
          }
      if(message.content.startsWith(prefix + 'VoiceHelp')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2FMensaje%20de%20help%20Definitibo.wav?1551205015057');
        message.channel.send('Usa el comando $help para descubrir mas del bot??')
        return;
      })
      .catch(console.error);
                  }
      if(message.content.startsWith(prefix + 'jhon')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fcancion-de-john-cena-descargar.mp3?1551205228937');
        message.channel.send('Estas escuchando la cancion Jhon Sina??')
        return;
      })
      .catch(console.error);
      }
        if(message.content.startsWith(prefix + 'happier')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fmarshmello-ft-bastille-happier-official-lyric-video.mp3?1551205512002');
        message.channel.send('Estas escuchando la cancion Marshmello - Happier??')
        return;
      })
      .catch(console.error);
      }
        if(message.content.startsWith(prefix + 'alone')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fmarshmello-alone-official-music-video.mp3?1551205775057');
        message.channel.send('Estas escuchando la cancion Marshmello - Alone??')
        return;
      })
      .catch(console.error);
      }
          if(message.content.startsWith(prefix + 'chambea')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fbad-bunny-chambea-letra-oficial.mp3?1551206922182');
        message.channel.send('Estas escuchando la cancion Bad Bunny - Chambe??')
        return;
      })
      .catch(console.error);
      }
            if(message.content.startsWith(prefix + 'abduzcan')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fremix-abduzcan-auronplay.mp3?1551207435031');
        message.channel.send('Estas escuchando la cancion Remix ABDUZCAN!! AuronPlay??')
        return;
      })
      .catch(console.error);
      }
              if(message.content.startsWith(prefix + 'noisestorm')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fnoisestorm-crab-rave-monstercat-release.mp3?1551208265141');
        message.channel.send('Estas escuchando la cancion Noisestorm - Crab Rave??')
        return;
      })
      .catch(console.error);
      }
                if(message.content.startsWith(prefix + 'YOUTUBE Rewind')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fyoutube-rewind-hispano-2018-alecmolon.mp3?1551208816936');
        message.channel.send('Estas escuchando la cancion YOUTUBE Rewind HISPANO 2.018 [Alecmolon]??')
        return;
      })
      .catch(console.error);
      }
                  if(message.content.startsWith(prefix + 'Movimiento Naranja Remix')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fyuawi-movimiento-naranja-remix-mind-invaders-extended-mix%20(1).mp3?1551209303052');
        message.channel.send('Estas escuchando la cancion Yuawi - Movimiento Naranja [REMIX] [Mind Invaders] [Extended Mix]??')
        return;
      })
      .catch(console.error);
      }
                  if(message.content.startsWith(prefix + 'Auxilio me desmallo')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fauxilio-me-desmayo-callese-viejo-lesviano-remix-original.mp3?1551210268236');
        message.channel.send('Estas escuchando Auxilio me desmallo??')
        return;
      })
      .catch(console.error);
      }
                    if(message.content.startsWith(prefix + 'Marshmello Fortnite')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fmarshmello-holds-first-ever-fortnite-concert-live-at-pleasant-park.mp3?1551210512686');
        message.channel.send('Estas escuchando el concierto de marshmello en fortnite??')
        return;
      })
      .catch(console.error);
      }
                      if(message.content.startsWith(prefix + 'El Dembow del Pimpin')){
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
        voiceChannel.join().then(conexion =>{
        conexion.playStream('https://cdn.glitch.com/459517f0-2050-411a-9606-9a033e89d173%2Fdembow-el-pimpin-el-cejas-video-oficial.mp3?1551283042254');
        message.channel.send('Estas escuchando El cejas revoluciona Got Talent con El Dembow del Pimpin| MediasetDembow El Pimpi / EL CEJAS Video Oficial??')
        return;
      })
      .catch(console.error);
      }
  
    client.on("guildMemberAdd", (member) => {
    let canal = client.channels.get('');
    canal.send(`Hola ${member.user}, bienvenido al servidor ${member.guild.name} pasala bien!.`);
    member.addRole(554081124192616465).catch(console.error);
});

  client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

  //IP's de servidores aliados/postulados
  
  
  
      if(message.content.startsWith(prefix + 'MineTox')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .setImage('https://cdn.discordapp.com/app-icons/557603319099424794/d76f503eb58c0e84f1f660c0661bd4ae.png?size=64')
      .addField('Esta es la IP del servidor','**play.minetox.net - mc.minetox.net - minetox.net**')
      .addField('Informacion','Para postular/aliar tu ip con el bot contacta con @ERROR 502#0908 o entra al siguiente servidor de [discord](https://discord.gg/UUk34J8)')
      .setColor('#00FFD1')
      .setFooter('Earth Games System - Created by: @ERROR 502#0908', client.user.avatarURL)
      message.channel.send({embed});
}
  
    
      if(message.content.startsWith(prefix + 'PortalCraft')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .setImage('https://cdn.discordapp.com/attachments/530052464024616962/530053167962914816/635776625666050160.png')
      .addField('Esta es la IP del servidor','**IPs: play.portalcraft.ml - mc.portalcraft.ml - portalcraft.ml - En Mantenimiento**')
      .addField('Informacion','Para postular/aliar tu ip con el bot contacta con @ERROR 502#0908 o entra al siguiente servidor de [discord](https://discord.gg/UUk34J8)')
      .setColor('#00FFD1')
      .setFooter('Earth Games System - Created by: @ERROR 502#0908', client.user.avatarURL)
      message.channel.send({embed});
}
  
  //Codigos para sugerir cosas al staff de EarthGames
  
                 if(message.content.startsWith(prefix + 'sugerencia')) {

  if (!args) return message.reply('Escriba el mensaje a enviar');
client.channels.get('558979139999367168').send(args.join(" ")+'\n**????????????????????????????**'+`\nRequested by: ${message.author.username}, in **Server anunciament In Developing**`);
               }
  
    if(message.content.startsWith(prefix + "sugerencia")) {
    message.channel.send("**Escrive una sugerencia para enviar a los owners**");
    }
  
                   if(message.content.startsWith(prefix + 'reportBugs')) {

  if (!args) return message.reply('Escriba el mensaje a enviar');
client.channels.get('548987804831449128').send(args.join(" ")+'\n**????????????????????????????**'+`\nRequested by: ${message.author.username}, in **Server anunciament In Developing**`);
               }
  
    if(message.content.startsWith(prefix + "reportBugs")) {
    message.channel.send("**Escrive alguna cosa para enviar a los owners**");
    }
  
  //apartado de sorteos 
                     if(message.content.startsWith(prefix + 'randomUser')) {
  message.channel.send('La maquina escojio a: **'+ message.guild.members.random().user+'**');
      
                                                                               }else
    if(message.content.startsWith(prefix + 'giveaway')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Ganador1 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .setThumbnail('https://cdn.discordapp.com/emojis/451435483021705216.gif?v=1')
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter('Created By: ERROR 502#0908 ', client.user.avatarURL)
      message.channel.send({embed});
    
                       
                                                        }
    if(message.content.startsWith(prefix + 'giveaway 2')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Ganador1 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .addField('Ganador2 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .setThumbnail('https://cdn.discordapp.com/emojis/451435483021705216.gif?v=1')
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter('Created By: ERROR 502#0908 ', client.user.avatarURL)
      message.channel.send({embed});
    }
                       
                                 
    if(message.content.startsWith(prefix + 'giveaway 3')){
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL )
      .addField('Ganador1 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .addField('Ganador2 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .addField('Ganador3 ??', 'Afortunado: **'+ message.guild.members.random().user+'**')
      .setThumbnail('https://cdn.discordapp.com/emojis/451435483021705216.gif?v=1')
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter('Created By: ERROR 502#0908 ', client.user.avatarURL)
      message.channel.send({embed});
    }
  
    
  if(message.content.startsWith(prefix + 'DiscordInvite')) {
  var id = message.channel.id;
message.guild.channels.get(id).createInvite({
    maxAge: 0       //maxAge: 0 significa que el link sera permanente

}).then(invite =>
    message.channel.send(invite.url)
);
                       }
      client.on('guildMemberAdd', member => {
  let canal = client.channels.get('549221304394317834')

 let embed = new Discord.RichEmbed()
 
 .setTitle("Un nuevo miembro se ha unido!")
 .setcolor("RANDOM")
 .setThumbnail(member.user.avatarURL)
 .setDescription(`${member} ha entrado en el servidor!!`)
 
  canal.send(embed);
});
  const palabras = ["hack", "rata", "friki", "puta", "que te den", "retrasado", "mongolo", "subnormal", "jilipollas", "eres corto", "idiota", "retarder"];

if(palabras.some(p => message.content.includes(p))){

 //Si detecta la palabra de la matriz envie un mensaje.
  message.delete(); 
  message.channel.send("¡Oh, no permito esto!");
  
}
  //Probando codigos de musica
  

const ytSearch = require( 'yt-search' )
 
ytSearch( 'superman theme', function ( err, r ) {
  if ( err ) throw err
 
  const videos = r.videos
  const playlists = r.playlists
  const accounts = r.accounts
 
  const firstResult = videos[ 0 ]
 
  console.log( firstResult )
})
  

  
  const opts = {
  query: 'superman theme',
  pageStart: 1, // first youtube page result
  pageEnd: 3 // up until page 3
}
 
ytSearch( opts, function ( err, r ) {
  if ( typeof opts === 'string' ) {
    opts = {
      query: opts,
      pageStart: 1,
      pageEnd: 3
    }
  }
 
  // etc
} )
  
  //    client.on("guildMemberAdd", (member) => {
    //
  //APARTADO CUSTOMIZABLE

  
});
client.login("NTQ1NjczNDQ5OTAxNzg1MTEw.XLil8A.HW1FTzD8aeVdNWuRxJ_IujbGS80");