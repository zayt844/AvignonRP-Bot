import { EmbedBuilder } from "discord.js";

export default {
  name: "sayembed",
  description: "Fait parler le bot avec un embed",

  options: [
    {
      name: "titre",
      description: "Titre de l'embed",
      type: 3,
      required: true
    },
    {
      name: "message",
      description: "Contenu de l'embed",
      type: 3,
      required: true
    }
  ],

  async execute(interaction) {
    const titre = interaction.options.getString("titre");
    const message = interaction.options.getString("message");

    const embed = new EmbedBuilder()
      .setTitle(titre)
      .setDescription(message)
      .setColor("#ff0000");

    await interaction.reply({ embeds: [embed] });
  }
};
