import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import fs from "fs";
import path from "path";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

// COMMANDES
const commandsPath = path.join(process.cwd(), "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.name, command.default);
}

// EVENTS
const eventsPath = path.join(process.cwd(), "events");
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event.default.once) {
    client.once(event.default.name, (...args) => event.default.execute(...args, client));
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args, client));
  }
}

client.login(process.env.DISCORD_BOT_TOKEN);
