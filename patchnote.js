import { EmbedBuilder } from "discord.js";

export default {
  name: "patchnote",
  description: "Envoie un patch note",

  options: [
    {
      name: "contenu",
      description: "Le contenu du patch note",
      type: 3,
      required: true
    }
  ],

  async execute(interaction) {
    const contenu = interaction.options.getString("contenu");

    const embed = new EmbedBuilder()
      .setTitle("🛠️ Patch Notes — Avignon RP")
      .setColor("#ff0000")
      .setDescription(contenu)
      .setTimestamp()
      .setFooter({ text: "Mise à jour du serveur" });

    await interaction.reply({ embeds: [embed] });
  }
};
