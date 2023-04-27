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
        .setDescription("Manages strikes for the user.")
        .addSubcommand((option) =>
            option
                .setName("add")
                .setDescription("Adds a strike to the user.")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("The user to add a strike to.")
                        .setRequired(true),
                )
                .addUserOption((option) =>
                    option
                        .setName("reason")
                        .setDescription("The reason for the strike.")
                        .setRequired(true),
                ),
        )
        .addSubcommand((option) =>
            option
                .setName("remove")
                .setDescription("Removes a strike from the user.")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("The user to add a strike to.")
                        .setRequired(true),
                ),
        )
        .addSubcommand((option) =>
            option
                .setName("clear")
                .setDescription("Clears all strikes from the user."),
        )
        .addSubcommand((option) =>
            option
                .setName("list")
                .setDescription("Lists all strikes for the user.")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("The user to display strikes for.")
                        .setRequired(true),
                ),
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to display strikes for.")
                .setRequired(true),
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user;
        const subcommand = interaction.options.getSubcommand();
        const profile = await Profile.findOne({
            userID: user.id,
        });

        if (!profile)
            return interaction.reply({
                content: "This user has no strikes!",
                ephemeral: true,
            });

        switch (subcommand) {
            case "list":
                {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL(),
                        })
                        .setTitle(`${user.username}'s strikes`)
                        .setDescription(
                            `${profile.strikes
                                .map(
                                    (strike) =>
                                        `${strike.reason} - ${strike.count}`,
                                )
                                .join("\n")}`,
                        )
                        .setColor("#FFFFFF")
                        .setTimestamp();

                    await interaction.reply({
                        embeds: [embed],
                    });
                }
                break;
            case "add":
                {
                    const reason = interaction.options.getString("reason");
                    let strike = profile.strikes.find(
                        (strike) => strike.reason === reason,
                    );
                    if (!strike) {
                        profile.strikes.push({
                            reason: reason,
                            count: 1,
                        });
                    }
                    await profile.save();

                    await interaction.reply({
                        content: `Added a strike to ${user.username} for ${reason}! They now have ${profile.strikes.length} strikes.`,
                    });
                }
                break;

            case "remove":
                {
                    // remove any strike
                    profile.strikes.pop();
                    await profile.save();
                    const totalStrikes = profile.strikes.reduce(
                        (acc, curr) => acc + curr.count,
                        0,
                    );

                    await interaction.reply({
                        content: `Removed a strike from ${user.username}! They now have ${totalStrikes} strikes.`,
                    });
                }
                break;

            case "clear":
                {
                    profile.strikes = [];
                    await profile.save();

                    await interaction.reply({
                        content: `Cleared all strikes from ${user.username}!`,
                    });
                }
                break;
        }
    },
};
