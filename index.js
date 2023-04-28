const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");
const {
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction } = Partials;
const client = new Client({
    intents: [
        Guilds,
        GuildMembers,
        GuildMessages,
        MessageContent,
        GuildVoiceStates,
    ],
    partials: [User, Message, GuildMember, ThreadMember, Reaction],
});
const { Player } = require("discord-music-player");

const { loadEvents } = require("./handlers/event");

client.events = new Collection();
client.commands = new Collection();
client.player = new Player(client);
loadEvents(client); // Load events

require("dotenv").config();
client.login(process.env.BOT_TOKEN).catch((err) => {
    console.log(err);
});
