export default {
  name: "interactionCreate",
  async execute(interaction, client) {

    // COMMANDES SLASH
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      return command.execute(interaction, client);
    }

    // TICKETS
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "ticket_select") {
        const ticketHandler = await import("../tickets/ticketCreate.js");
        return ticketHandler.default.execute(interaction, client);
      }
    }
  }
};
