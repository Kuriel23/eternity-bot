const discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.guild === null) return;
  if (message.author.bot) return 0;
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

  const replied =
    message.reference !== null
      ? await message.channel.messages.fetch(message.reference.messageId)
      : null;

  if (
    message.content.includes(`<@${client.user.id}>`) ||
    (replied !== null ? replied.author.id === client.user.id : 0)
  ) {
    message
      .reply({
        content:
          "<a:LNE_branco_kira:940057252629471295> Vendo o Lyke no vídeo fazer merda dentro de mim...",
      })
      .then((msg) => {
        const youchatwrapper = require("@codernocook/youchatwrapper");
        youchatwrapper.cloudflare_message_bypass = true;
        youchatwrapper.cloudflare_retry_limit = 5;
        youchatwrapper.apiKey = "FPWETB472RRB9L67U32US47RBW1D5Y0GH8M";
        youchatwrapper.retry = true;
        youchatwrapper.retry_limit = 3;

        youchatwrapper.chat(
          `responde-me em português! ${message.content.replace(
            `<@${client.user.id}>`,
            ""
          )}`,
          function (callback) {
            if (callback.length < 500 || message.channel.isThread())
              msg.edit({
                content: callback
                  .replace("@everyone", "everyone")
                  .replace("@here", "here")
                  .replace("you.com", "Animes Eternity")
                  .replace("You.com", "Animes Eternity"),
              });
            else {
              const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let randomString = "";
              for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                randomString += chars[randomIndex];
              }
              msg
                .startThread({
                  name: "AI Eternity #" + randomString,
                  autoArchiveDuration: 60,
                  reason: "Ativado sistema para evitar poluição do chat.",
                })
                .then((thread) =>
                  thread.send({
                    content: callback
                      .replace("@everyone", "everyone")
                      .replace("@here", "here")
                      .replace("you.com", "Animes Eternity")
                      .replace("You.com", "Animes Eternity"),
                  })
                );
            }
          }
        );
      });
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
