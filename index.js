const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
    GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./handlers/event");

client.events = new Collection();
client.commands = new Collection();
loadEvents(client); // Load events

require("dotenv").config();
client.login(process.env.BOT_TOKEN).catch((err) => {
    console.log(err);
});
