const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Skip extends Command {

    constructor (client) {
        super(client, {
            name: "skip",
            description: (language) => language.get("SKIP_DESCRIPTION"),
            usage: (language) => language.get("SKIP_USAGE"),
            examples: (language) => language.get("SKIP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "next" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let queue = message.client.queues.get(message.guild.id);

        let voice = message.member.voice.channel;
        if (!voice){
            return message.channel.send(message.language.get("PLAY_ERR_VOICE_CHANNEL"));
        }

        if(!queue){
            return message.channel.send(message.language.get("PLAY_ERR_NOT_PLAYING"));
        }

        if(!queue.songs[1]){
            return message.channel.send(message.language.get("SKIP_ERR_NO_SONG"));
        }

        let members = voice.members.filter((m) => m.id !== message.client.user.id);

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("SKIP_TITLE"))
            .setThumbnail(queue.songs[1].thumbnail)
            .setFooter(data.config.embed.footer)
            .setColor(data.config.embed.color);

        let m = await message.channel.send(embed);

        if(members.size > 1){
            
            m.react("👍");

            let mustVote = members.size/2+1;

            embed.setDescription(message.language.get("SKIP_CONTENT", queue.songs[1].title, 0, mustVote));
            m.edit(embed);
    
            let filter = (reaction, user) => {
                let member = message.guild.members.get(user.id);
                let voiceChannel = member.voice.channel;
                if(voiceChannel){
                    if(voiceChannel.id === voice.id){
                        return true;
                    } else {
                        return false;
                    }
                }
            };

            let collector = await m.createReactionCollector(filter, {
                time: 25000
            });

            collector.on("collect", (reaction, user) => {
                let haveVoted = reaction.count-1;
                if(haveVoted >= mustVote){
                    skip();
                    embed.setDescription(message.language.get("SKIP_CONTENT_COMPLETE", queue.songs[1].title));
                    m.edit(embed);
                    collector.stop(true);
                } else {
                    embed.setDescription(message.language.get("SKIP_CONTENT", queue.songs[1].title, haveVoted, mustVote));
                    m.edit(embed);
                }
            });

            collector.on("end", (collected, isDone) => {
                if(!isDone){
                    return message.channel.send(message.language.get("PLAY_ERR_TIMEOUT"));
                }
            });

        } else {
            skip();
            embed.setDescription(message.language.get("SKIP_CONTENT_COMPLETE", queue.songs[1].title));
            m.edit(embed);
        }

        function skip(){
            queue.connection.dispatcher.end();
        }
        
    }

}

module.exports = Skip;