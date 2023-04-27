const profileModel = require("./profile");

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        guildID: member.guild.id,
        strikes: 0,
    });
    profile.save();
};
