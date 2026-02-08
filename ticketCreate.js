import {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";

export default {
  name: "interactionCreate",

  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "ticket_select") return;

    const category = interaction.values[0];
    const user = interaction.user;

    const staffRoles = [
      "⚡ Co-Fondateur",
      "Gérant-Staff",
      "🛡️ Administrateur",
      "🔧 Modérateur",
      "🧪 Helper",
      "📋 Modérateur Test",
      "📋 Staff Test"
    ];

    const guild = interaction.guild;

    const ticketChannel = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory
          ]
        },
        ...staffRoles.map(roleName => {
          const role = guild.roles.cache.find(r => r.name === roleName);
          if (!role) return null;
          return {
            id: role.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory
            ]
          };
        }).filter(Boolean)
      ]
    });

    const embed = new EmbedBuilder()
      .setTitle("🎫 Ticket Ouvert")
      .setColor("#ff0000")
      .setDescription(`
**Utilisateur :** <@${user.id}>
**Catégorie :** ${category}

Merci de répondre aux questions suivantes :
1️⃣ Explique ton problème  
2️⃣ Depuis quand ?  
3️⃣ As-tu des preuves ?  
4️⃣ Autres informations utiles  
      `)
      .setTimestamp();

    await ticketChannel.send({
      content: staffRoles
        .map(r => {
          const role = guild.roles.cache.find(x => x.name === r);
          return role ? `<@&${role.id}>` : null;
        })
        .filter(Boolean)
        .join(" "),
      embeds: [embed]
    });

    await interaction.reply({
      content: `🎫 Ticket créé : <#${ticketChannel.id}>`,
      ephemeral: true
    });
  }
};
