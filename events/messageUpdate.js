// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (oldMessage, newMessage) {
      

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {

    
       
        var log = newMessage.guild.channels.find('name', "logs");
        if (log != null)

        var embed = new Discord.RichEmbed()
          .setAuthor(newMessage.author.username, newMessage.author.displayAvatarURL)
          .setDescription("Messages logs \n `EDIT`")
          .addField("Message edited by", newMessage.author, true)
          .addField("Last message",oldMessage.cleanContent, false)
          .addField("New message:", newMessage.cleanContent)
          .setTimestamp()
            log.sendMessage(embed);
           
    }

});
};
