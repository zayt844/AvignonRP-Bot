import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  name: "connect",
  description: "Envoie un bouton pour se connecter à Avignon RP",

  async execute(interaction) {
    const serverIP = process.env.SERVER_IP;

    const embed = new EmbedBuilder()
      .setTitle("🎮 Connexion à Avignon RP")
      .setDescription(`Clique sur le bouton ci-dessous pour te connecter directement.\n\n**IP :** \`${serverIP}\``)
      .setColor("#ff0000")
      .setImage("attachment://logo.png")
      .setFooter({ text: "Avignon RP — FiveM", iconURL: "attachment://logo.png" });

    const button = new ButtonBuilder()
      .setLabel("Se connecter au serveur")
      .setStyle(ButtonStyle.Link)
      .setURL(`fivem://connect/${serverIP}`);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
      files: [{ attachment: "./logo.png", name: "logo.png" }]
    });
  }
};
