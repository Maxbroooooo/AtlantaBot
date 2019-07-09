client.on('messageDelete', function(message) {

    if(message.channel.type == 'text') {

        
        
        let log = message.guild.channels.find('name', "logs");
        if (log != null)

        let embed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setDescription(message.language.get("MESSAGE_DELETE")[3])
          .setTimestamp()
          .setColor(this.client.config.embed.color)
          .setFooter(this.client.config.embed.footer)
          .addField(message.language.get("MESSAGE_DELETE")[0], message.author, true)
          .addField(message.language.get("MESSAGE_DELETE")[1], message.cleanContent, false)
            log.sendMessage(embed);

    }

});
