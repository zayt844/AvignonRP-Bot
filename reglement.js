import { EmbedBuilder } from "discord.js";

export default {
  name: "reglement",
  description: "Affiche le règlement du Discord",

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📜 Règlement — Avignon RP")
      .setColor("#ff0000")
      .setDescription(`
**1️⃣ Respect obligatoire**
Aucun insultes, harcèlement, propos racistes, homophobes, sexistes.

**2️⃣ Publicité interdite**
Aucune pub Discord / FiveM / Twitch / Insta.

**3️⃣ Comportement**
Pas de spam, pas de troll, pas de soundboard abusif.

**4️⃣ Staff**
Les décisions du staff doivent être respectées.

**5️⃣ RP**
Le RP doit être sérieux, cohérent et respecté.

**6️⃣ Sanctions**
Le staff peut sanctionner sans avertissement si nécessaire.
      `)
      .setFooter({ text: "Avignon RP — Règlement officiel" });

    await interaction.reply({ embeds: [embed] });
  }
};
