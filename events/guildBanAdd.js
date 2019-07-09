client.on('guildBanAdd', function(guild, user) {

    
   
    let log = guild.channels.find('name', "logs");
    if (!log) log = null
    let embed = new Discord.RichEmbed()
    .setAuthor(user.username, user.displayAvatarURL)
    .setDescription(message.language.get("ADDBAN_HEADING"))
    .setTimestamp()
    .setColor(this.client.config.embed.color)
    .setFooter(this.client.config.embed.footer)
        log.sendMessage(embed);

});
