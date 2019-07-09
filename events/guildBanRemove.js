client.on('guildBanRemove', function(guild, user) {

   


    var log = guild.channels.find('name', "logs");
    if (log != null)
    log.sendMessage('**Member unban **: ' + user);

});s
