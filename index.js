const fs = require("fs");
const discord = require("discord.js")
const config = require("./config.json");
const {Client, RichEmbed} = require('discord.js');
const client = new Client();
const PREFIX = config.prefix
_SAINTS = {AFK: {},}

const invites = {};

console.log("connexion en cours")
client.login(config.token);{
  console.log('préfix actuel: ' + PREFIX)}

client.on("ready", async () => {
  const embedreglement = new discord.MessageEmbed()
    .setDescription("***Cliquez sous la réaction ci-dessous afin d'accèder au reste du serveur. Si vous avez quittez vous devez decocher et recocher l'emoji.***") 
    .setTimestamp()
    .setFooter('.',client.user.displayAvatarURL());
  console.log(`${client.user.username} est connecté!`);
  client.user.setActivity("prefix: <")
  let paradisa = client.guilds.cache.get("712286729985327116")
  let salon = paradisa.channels.cache.get("790640933019844660")
  salon.send(embedreglement).then( m => m.react("792242661649940480"))
  salon.bulkDelete(1);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(newMessage.author.bot)return;
  let logs = oldMessage.guild.channels.cache.find(channels => channels.name === "「🧠」𝑴𝑶𝑫𝑬𝑹𝑨𝑻𝑰𝑶𝑵");
  if(!logs)return;
  let embed = new discord.MessageEmbed()
  .setTitle('**Discord message edit log:**')
  .setColor("ORANGE")
  .setDescription(`**L'utilisateur ${oldMessage.author} a edité son message dans dans ${oldMessage.channel}:**\n\n**Ancien contenu:** \`\`\`${oldMessage}\`\`\`\n**Nouveau contenu:** \`\`\`${newMessage}\`\`\``)

  try {
    logs.send(embed)
  }
  catch (error) { 
    console.log(error)};
});

client.on("messageReactionAdd", async (reaction, user) => {
  if(reaction.message.channel.id != "790640933019844660") return
  if (user.bot) return; 
  reaction.message.guild.member(user).roles.add('790640942993637386').catch(console.error())
      })

client.on("messageReactionRemove", async (reaction, user) => {
  if(reaction.message.channel.id != "790640933019844660") return
  if (user.bot) return; 
  reaction.message.guild.member(user).roles.remove('790640942993637386').catch(console.error())
      })



client.on('messageDelete', async message => {
  if(message.author.bot) return
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog) return 
	const { executor, target } = deletionLog;

  
  let logs = message.guild.channels.cache.find(channels => channels.name === "「🧠」𝑴𝑶𝑫𝑬𝑹𝑨𝑻𝑰𝑶𝑵");
  if(!logs)return;
  if(target.id === message.author.id){
    let embed = new discord.MessageEmbed()
    .setTitle('**Discord message delete log:**')
    .setColor("#e4b400")
    .setDescription(`**Message de ${message.author} supprimé par ${executor.tag} dans ${message.channel}:** \`\`\`${message.content}\`\`\``)
    try {
      logs.send(embed)
    }
    catch (error) { 
      console.log(error)};
  }else{
  let embed = new discord.MessageEmbed()
  .setTitle('**Discord message delete log:**')
  .setColor("#e4b400")
  .setDescription(`**${message.author} a supprimé son message dans ${message.channel}:** \`\`\`${message.content}\`\`\``)
  
  try {
    logs.send(embed)
  }
  catch (error) { 
    console.log(error)};
  }
});

client.on("voiceStateUpdate", (oldState, newState) => {
 var user = client.users.cache.get(newState.id);
 var channelf = client.channels.cache.get(oldState.channelID);
  if(newState.bot) return;
  if(newState.channelID === "791019796694171698") {
  newState.guild.channels.create(`Salon de ${user.username}`, {
    type: "voice",
    parent: "790640920743247872",
    permissionOverwrites: [
      {
        id: user.id,
        allow: ["MANAGE_CHANNELS"],
     },
   ],
  })
    .then((channel) => {
    newState.guild.member(user).voice.setChannel(channel)
  })
}
  if(oldState) {
    let filter = (ch) =>
        (ch.parentID == "790640920743247872")
        && (ch.id != "791019796694171698")
        && (oldState.channelID == ch.id)
        && (channelf.members.size == 0);
    
    return oldState.guild.channels.cache
        .filter(filter)
        .forEach((ch) => ch.delete());
}
});

client.on("guildMemberAdd", member => {
  let yolo = client.guilds.cache.get("712286729985327116")
  let membersCount = yolo.memberCount
  let memberCountsalon = yolo.channels.cache.get("790640925151723520")
  memberCountsalon.setName('𝐌𝐞𝐦𝐛𝐫𝐞𝐬: ' + membersCount).catch(error => console.log(error))
  console.log(`${yolo.name} Membres: ${membersCount}`)
  if(member.bot) return
  /*
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const inviter = client.users.cache.get(guildInvites.member.id);
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "「👋」nouveaux");
    const userInvites = guildInvites.array().filter(o => o.inviter.id === user.id);
    var userInviteCount = 0;
    for(var i=0; i < userInvites.length; i++)
    {
        var _invite = userInvites[i];
        userInviteCount += _invite['uses'];
    }
    var embed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`*Un nouveau membre nommé **${member.user.tag}** a rejoint l' :trident:・𝐀𝐓𝐋𝐀𝐍𝐓𝐈𝐃𝐄, il a été invité par **${inviter.tag}**, (**${userInviteCount}** invites)* :tada:`);
    logChannel.send(embed);
  })*/
})
client.on("guildMemberRemove", member => {
  let yolo = client.guilds.cache.get("712286729985327116")
  let membersCount = yolo.memberCount
  let memberCountsalon = yolo.channels.cache.get("790640925151723520")
  memberCountsalon.setName('𝐌𝐞𝐦𝐛𝐫𝐞𝐬: ' + membersCount).catch(error => console.log(error))
  console.log(`${yolo.name} Membres: ${membersCount}`)
})


/*
var _CODE = {};
fs.readdir("./commands/", (err, files) => 
{

  if (err) console.error(err);
  
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("Aucune commande à charger.");

  console.log(`Chargement de ${jsfiles.length} commandes...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.dir(props)
    console.log(`${i + 1}: ${f} chargé`);
    if(props.prefix)
    {
      _CODE[PREFIX + props.name] = props;
    }
    else _CODE[props.name] = props;
  });

});


client.on("message", async msg => 
{  

  if(msg.channel.type === "dm")return
  const args = msg.content.split(' ').slice(1)

  let pings = msg.guild.channels.cache.get('684877249568178186')
  let mention = client.users.cache.get('682903991847616539')
if(msg.mentions.has(mention)){
  if(!msg.author.bot){
      if(!msg.member.hasPermission('VIEW_AUDIT_LOG')){
        if(msg.channel.id === "685220299310235728") return;
      else{
        msg.delete()
        msg.channel.send(`*tg ${msg.author} mentionne pas ${mention.username} apart si t'es dans #Elite , tu risques **un viol**!*`)
        pings.send(`> Dieu a été ping par ${msg.author} \n > **Message:**: ${msg.content}`)}

        
      }else {return}
}
}


/*if(msg.content === "adminmode"){
  msg.delete()
  let embedkick = new discord.MessageEmbed()
  .setTitle("**Tu as été kick pour débilité**")
  .setDescription("Si tu veux contester ton ban rejoins ce serveur : https://discord.gg/srezKxu")
  .setTimestamp()
  .setColor("RED")
  .setFooter(".", client.user.displayAvatarURL);
  msg.author.send(embedkick)
  msg.member.kick({
    reason: "adminmode",
  }).then(() => {
    msg.channel.send(`> **${msg.author} a été /kill**`)
    let logs = msg.guild.channels.get("684877249568178186")
    const bam = new discord.MessageEmbed()
    logs.send({embed:
        bam.setFooter('.',client.user.avatarURL)
        .setTitle(`**${msg.author} a été kick pour débilité, message:`)
        .setDescription("```\n"+ `${msg.content}\n` +"```")
        .setColor("RED")});
  }) 
}

checkMsg(client, msg, _SAINTS);

var _cmd = msg.content.split(" ")[0].toLowerCase();
if(_CODE[_cmd])
{
  _CODE[_cmd].run(client, msg, _cmd, _SAINTS, args);
}
});


function checkMsg(client, message, _SAINTS)
{
if (message.content.includes(message.mentions.users.first()))
{
  if(!message.author.bot){
  if(_SAINTS.AFK[message.mentions.users.first().id])
  {
    var _user = _SAINTS.AFK[message.mentions.users.first().id]
      message.guild.fetchMember(_user.id).then(member => {
        message.channel.send(`> ${_user.raison}`).then(msg => msg.delete(10000));
       
      });
  }}
}
});*/
