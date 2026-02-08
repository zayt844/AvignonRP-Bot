export default {
  name: "clear",
  description: "Supprime un nombre de messages",

  options: [
    {
      name: "nombre",
      description: "Nombre de messages à supprimer",
      type: 4,
      required: true
    }
  ],

  async execute(interaction) {
    const amount = interaction.options.getInteger("nombre");

    if (!interaction.member.permissions.has("ManageMessages"))
      return interaction.reply({ content: "❌ Tu n'as pas la permission.", ephemeral: true });

    if (amount < 1 || amount > 100)
      return interaction.reply({ content: "❌ Choisis entre 1 et 100 messages.", ephemeral: true });

    const messages = await interaction.channel.messages.fetch({ limit: amount });
    await interaction.channel.bulkDelete(messages, true);

    await interaction.reply({ content: `🧹 ${amount} messages supprimés.`, ephemeral: true });
  }
};
