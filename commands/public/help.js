const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays a list of commands for the bot."),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTitle("List of commands")
            .setDescription(
                `${client.commands
                    .filter((cmd) => !cmd.developer)
                    .map(
                        (cmd) =>
                            `\`${cmd.data.name}\` - ${cmd.data.description}`,
                    )
                    .join("\n")}`,
            )
            .setColor("#FFFFFF")
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};
