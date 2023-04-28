const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get the avatar of a user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to get the avatar of.")
                .setRequired(true),
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * */
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });
        return interaction.reply({
            embeds: [
                {
                    title: `${user.tag}'s Avatar`,
                    image: {
                        url: avatar,
                    },
                },
            ],
        });
    },
};
