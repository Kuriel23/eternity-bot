const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ban")
    .setNameLocalizations({
      "pt-BR": "banir",
      "en-US": "ban",
    })
    .setDescription("Alguém mereceu levar uma martelada!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
        .setDescription("Identifique um motivo para o aviso")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("usuário");
    const reason = interaction.options.getString("motivo");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {
        if (err) return 0;
      }));
    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply({
        content: "O membro que você mencionou tem cargos mais altos que você.",
      });
    if (!member.bannable || member.user.id === client.user.id)
      return interaction.reply({ content: "Não posso banir esse membro." });
    const conf = new discord.ButtonBuilder()
      .setCustomId(interaction.member.id + "confirm")
      .setLabel("Confirmar")
      .setStyle(2);
    const botao = new discord.ActionRowBuilder().addComponents(conf);

    interaction.reply({
      content: "Você está prestes a banir um usuário, confirma a sua ação?",
      components: [botao],
    });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: discord.ComponentType.Button,
      filter,
      time: 30000,
      max: 1,
    });
    collector.on("collect", async (i) => {
      if (i.customId === interaction.member.id + "confirm") {
        member.ban({
          reason: `${reason} - Punido por: ${interaction.member.user.tag}`,
        });
        i.update({
          content: `${member.user.tag} foi banido ${
            reason ? `por ${reason}` : ""
          } com sucesso.`,
          components: [],
        });
      }
    });
  },
};
