const discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.guild === null) return;

  if (
    (message.content.startsWith("pt?") &&
      message.author.id === "354233941550694400") ||
    (message.content.startsWith("pt?") &&
      message.author.id === "799673406014095440")
  )
    require("../messages/" + message.content.replace("pt?", ""))(
      client,
      message
    ).catch((err) => {
      return message.reply(err);
    });

  if (
    message.content.includes(`<@${client.user.id}>`) ||
    (replied !== null ? replied.author.id === client.user.id : 0)
  ) {
    const youchatwrapper = require("@codernocook/youchatwrapper");
    youchatwrapper.cloudflare_message_bypass = true;
    youchatwrapper.cloudflare_retry_limit = 5;
    youchatwrapper.apiKey = "FPWETB472RRB9L67U32US47RBW1D5Y0GH8M";
    youchatwrapper.retry = true;
    youchatwrapper.retry_limit = 3;

    youchatwrapper.chat(
      "responde-me em português! " +
        message.content.replace(`<@${client.user.id}>`, ""),
      function (callback) {
        message.reply(
          callback
            .replace("@everyone", "everyone")
            .replace("@here", "here")
            .replace("you.com", "Animes Eternity")
        );
      }
    );
  }

  if (message.guild.id === process.env.GUILD_ID) {
    if (
      message.member &&
      !message.member.permissions.has(discord.PermissionFlagsBits.Administrator)
    )
      return;
    if (message.content.startsWith(`<@${client.user.id}>`)) {
      const embed = new discord.EmbedBuilder()
        .setTitle("Control - A fast and efficient control")
        .setDescription(
          "Comandos de desenvolvimento tudo num menu de controlo rápido e eficiente!"
        )
        .setColor(client.cor);
      const row = new discord.ActionRowBuilder().addComponents(
        new discord.StringSelectMenuBuilder()
          .setCustomId("control")
          .setPlaceholder("Controle tudo imediatamente!")
          .addOptions({
            label: "Faça evaluate de um código (dev only)",
            description: "Cuidado isto pode ser perigoso!",
            value: "eval",
          })
      );
      message.reply({ embeds: [embed], components: [row] });
    }
  }
};
