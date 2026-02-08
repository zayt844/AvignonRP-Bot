import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} from "discord.js";

export default {
  name: "ticketmenu",
  description: "Envoie le menu des tickets",

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("🎫 Centre de Support — Avignon RP")
      .setDescription("Choisissez une catégorie pour ouvrir un ticket.")
      .setColor("#ff0000");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("ticket_select")
      .setPlaceholder("Choisis une catégorie de ticket")
      .addOptions([
        { label: "Aide", value: "aide" },
        { label: "Report", value: "report" },
        { label: "Dossier légal", value: "legal" },
        { label: "Aide boutique", value: "boutique" },
        { label: "Compte perdu / Mort RP", value: "compte" },
        { label: "Déban / Unjail", value: "deban" },
        { label: "Plainte staff", value: "staff" },
        { label: "Autre", value: "autre" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
