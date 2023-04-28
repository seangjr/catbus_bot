const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
} = require("discord.js");
const {
    joinVoiceChannel,
    createAudioResource,
    StreamType,
    createAudioPlayer,
    AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core-discord");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song in the voice channel.")
        .addStringOption((option) =>
            option
                .setName("song")
                .setDescription(
                    "The song to play. Can be a YouTube URL, or a song name.",
                )
                .setRequired(true),
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     **/

    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const vc = member.voice.channel;
        if (!vc) {
            return interaction.reply("You must be in a voice channel!");
        }

        const permissions = vc.permissionsFor(interaction.client.user);
        if (
            !permissions.has(PermissionFlagsBits.Connect) ||
            !permissions.has(PermissionFlagsBits.Speak)
        ) {
            return interaction.reply(
                "I need the permissions to join and speak in your voice channel!",
            );
        }

        let guildQueue = client.player.getQueue(guild.id);
        let queue = client.player.createQueue(guild.id);
        await queue.join(vc);
        await queue.play(interaction.options.getString("song")).catch((err) => {
            console.log(err);
        });
    },
};
