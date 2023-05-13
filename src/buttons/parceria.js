const discord = require("discord.js");

module.exports = async (client, interaction) => {
  const mensagemInput = new discord.TextInputBuilder()
    .setCustomId("mensagemInput")
    .setLabel("Qual o convite de parceria?")
    .setRequired(true)
    .setPlaceholder("https://discord.gg/AnimesEternity \n\nEntre já!!!")
    .setStyle(discord.TextInputStyle.Paragraph);
  const modal = new discord.ModalBuilder()
    .setCustomId("pedido_parceria")
    .setTitle("Solicitar Parceria")
    .setComponents(new discord.ActionRowBuilder().addComponents(mensagemInput));

  await interaction.showModal(modal);
  const enviada = await interaction
    .awaitModalSubmit({
      time: 3600000,
      filter: (i) => i.user.id === interaction.user.id,
    })
    .catch((error) => {
      if (error) return null;
    });

  if (enviada) {
    if (enviada.customId !== "pedido_parceria") return;
    const content = enviada.fields.getTextInputValue("mensagemInput");
    const convite =
      /(discord\.gg|discordapp\.com\/invite)\/.+/gi.test(
        content
      );
    if (!convite)
      return enviada.reply({
        content:
          "Sua parceria foi automaticamente negada por não possuir um convite válido! Tente novamente com um convite!",
        ephemeral: true,
      });
    const row = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder().setCustomId("ap").setEmoji("✅").setStyle(discord.ButtonStyle.Success),
      new discord.ButtonBuilder().setCustomId("rp").setEmoji("❎").setStyle(discord.ButtonStyle.Danger)
    );
    const inviteCodeRegexResult =
      /(discord\.gg|discordapp\.com\/invite)\/?([a-zA-Z0-9-]{2,70})/gi.exec(
        content
      );
    const code = inviteCodeRegexResult && inviteCodeRegexResult[4];
    client
      .fetchInvite(code)
      .then((invite) => {
        if (invite.memberCount < 150)
          return enviada.reply({
            content: `Sua parceria foi automaticamente negada por não possuir um número de membros superior ou igual ao solicitado nos requisitos! Tente novamente quando pegar a quantia.`,
            ephemeral: true,
          });

        if (invite._expiresTimestamp)
          return enviada.reply({
            content: `Sua parceria foi automaticamente negada por não possuir um convite permanentemente! Tente novamente com algo permanentemente!`,
            ephemeral: true,
          });
        client.channels.cache.get("1060004864681312346").send({
          content: `${content
            .replace(/(@here|@everyone|`)/g, "")
            .replace(/`+/g, "")}\nRep: <@${
            interaction.member.id
          }> <@&940072769624875119>`,
          components: [row],
        });
        return enviada.reply({
          content: "Seu pedido de parceria foi enviado para análise!",
          ephemeral: true,
        });
      })
      .catch((err) => {
        if (err)
          return enviada.reply({
            content: "Seu convite deu um erro desconhecido.",
            ephemeral: true,
          });
      });
  }
};
