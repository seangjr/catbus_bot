const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");
const Profile = require("../../models/profile");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("strikes")
        .setDescription("Displays a list of strikes for the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to display strikes for."),
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user;

        const profile = await Profile.findOne({
            userID: user.id,
        });

        if (!profile)
            return interaction.reply({
                content: "This user has no strikes!",
                ephemeral: true,
            });

        // if the user has no strikes, return
        if (profile.strikes.length === 0)
            return interaction.reply({
                content: "This user has no strikes!",
                ephemeral: true,
            });

        const embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTitle(`${user.username}'s strikes`)
            .setDescription(
                `${profile.strikes
                    .map((strike) => `${strike.reason} - ${strike.count}`)
                    .join("\n")}`,
            )
            .setColor("#FFFFFF")
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};
