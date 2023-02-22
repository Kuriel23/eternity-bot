const { PermissionFlagsBits } = require("discord.js");
const discord = require("discord.js");

module.exports = async (client, interaction) => {
  const tagger = interaction.user.tag;
  if (interaction.guild.channels.cache.find((c) => c.name === `${tagger}`)) {
    const c = interaction.guild.channels.cache.find(
      (c) => c.name === `${tagger}-duvida`
    );
    interaction.reply({
      content: `Você já possui um ticket aberto em ${c}.`,
      ephemeral: true,
    });
  } else {
    interaction.guild.channels
      .create({
        name: `${tagger}-duvida`,
        type: 0,
        parent: "936681946245902377",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.AddReactions,
            ],
          },
          {
            id: "936666713179709481",
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.AddReactions,
            ],
          },
          {
            id: "979464771604721684",
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.AddReactions,
            ],
          },
        ],
      })
      .then((c) => {
        interaction.reply({
          content: `Seu ticket foi aberto em ${c}.`,
          ephemeral: true,
        });

        const embed = new discord.EmbedBuilder()
          .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dynamic: true }),
          })
          .setColor(client.cor)
          .setDescription(
            `Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes para receber ajuda.`
          );

        const botao = new discord.ActionRowBuilder().addComponents(
          new discord.ButtonBuilder()
            .setCustomId("ft")
            .setEmoji("🔒")
            .setLabel("Fechar Ticket")
            .setStyle(2)
        );

        c.send({
          content: "<@&979464771604721684>",
          embeds: [embed],
          components: [botao],
        }).then((msg) => msg.pin());
      });
  }
};
