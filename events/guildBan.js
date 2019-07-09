client.on('guildBanAdd', function(guild, user) {

   
    var log = guild.channels.find('name', "logs");
    if (log != null)
        log.sendMessage('**Member ban **: ' + user);

});
