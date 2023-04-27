const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        await interaction.reply({
            content: `🏓 Pong! \`${client.ws.ping}ms\``,
        });
    },
};
