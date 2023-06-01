const { PermissionFlagsBits } = require("discord.js");
const discord = require("discord.js");

module.exports = async (client, interaction) => {
  const tagger = interaction.user.tag;
  if (interaction.guild.channels.cache.find((c) => c.name === `${tagger}`)) {
    const c = interaction.guild.channels.cache.find(
      (c) => c.name === `${tagger}-md`
    );
    interaction.reply({
      content: `Você já possui um ticket aberto em ${c}.`,
      ephemeral: true,
    });
  } else {
    interaction.guild.channels
      .create({
        name: `${tagger}-md`,
        type: 0,
        parent: "937014237082038333",
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
            id: "1000471228903067699",
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
            `Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes algum adm mudae irá aparecer para lhe ajudar`
          );

        const botao = new discord.ActionRowBuilder().addComponents(
          new discord.ButtonBuilder()
            .setCustomId("ft")
            .setEmoji("🔒")
            .setLabel("Fechar Ticket")
            .setStyle(2)
        );

        c.send({
          content: "<@&1000471228903067699>",
          embeds: [embed],
          components: [botao],
        }).then((msg) => msg.pin());
      });
  }
};
