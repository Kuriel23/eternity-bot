const discord = require("discord.js");

module.exports = async (client, message) => {
  message.delete();
  if (message.author.id !== "354233941550694400") return 0;
  const menu = new discord.StringSelectMenuBuilder()
    .setCustomId("suporte")
    .setPlaceholder("Escolha 1 tópico")
    .setMaxValues(1)
    .addOptions(
      { label: "Denúncia", value: "denuncia" },
      { label: "Dúvida", value: "duvida" },
      { label: "Suporte", value: "suporte" }
    );
  const row = new discord.ActionRowBuilder().addComponents(menu);
  message.channel.send({
    embeds: [
      {
        author: {
          name: "Abra um ticket para atendimento!",
          iconURL: "https://imgur.com/vOafXOj.gif",
        },
        description:
          "<:mugiwarasetr:980567123183157268> `Abra tickets para receber apoio`\n\n<:mugiwarasetr:980567123183157268> Seja atendido para **suporte** ou **denúncia**, clicando no **menu** abaixo\n\n<:mugiwarasetr:980567123183157268> **Não use o nosso sistema para brincadeiras, dessa forma terão que ser tomadas providências necessárias.**",
        color: parseInt(client.cor.slice(1), 16),
        footer: {
          text: "©️ 永遠 Anime's Eternity Todos os direitos reservados.",
        },
      },
    ],
    components: [row],
  });
};
