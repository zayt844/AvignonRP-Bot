import { REST, Routes } from "discord.js";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`🔥 Bot connecté en tant que ${client.user.tag}`);

    const commands = client.commands.map(cmd => ({
      name: cmd.name,
      description: cmd.description,
      options: cmd.options || []
    }));

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

    try {
      console.log("🔧 Enregistrement des commandes slash...");
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands }
      );
      console.log("✅ Commandes enregistrées !");
    } catch (err) {
      console.error(err);
    }
  }
};
