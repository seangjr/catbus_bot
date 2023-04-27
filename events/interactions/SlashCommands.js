const { ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        // if not a slash command, return
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({
                content: "This command doesn't exist!",
                ephemeral: true,
            });

        if (command.developer && interaction.user.id !== "832231777610629123")
            return interaction.reply({
                content: "This command is only for the developer!",
                ephemeral: true,
            });

        command.execute(interaction, client);
    },
};
