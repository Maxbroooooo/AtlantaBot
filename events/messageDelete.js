client.on('messageDelete', function(message) {

    if(message.channel.type == 'text') {

        
        
        var log = message.guild.channels.find('name', "logs");
        if (log != null)

        var embed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setDescription("Log des messages \n `DELETE`")
          .setTimestamp()
          .addField("Message supprimmé par", message.author, true)
          .addField("Message:", message.cleanContent, false)
            log.sendMessage(embed);

    }

});
