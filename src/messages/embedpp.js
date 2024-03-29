const discord = require("discord.js");

module.exports = async (client, message) => {
  message.delete();
  const button = new discord.ButtonBuilder()
    .setCustomId("parceria")
    .setLabel("Solicitar Parceria")
    .setStyle(2);
  const row = new discord.ActionRowBuilder().addComponents(button);
  message.channel.send({
    embeds: [
      {
        title:
          "***<:mugiwarasetr:980567123183157268>___Requisitos Anime's Eternity___***",
        description:
          "*** <a:setalaranja_etr:1060264240247738508> __Para fechar parceria como nosso servidor é necessário cumprir alguns requisitos. Para que possa fechar uma parceria corretamente leia a baixo:__***\n\n** <a:setalaranja_etr:1060264240247738508> Seguir as ToS do discord\n\n<a:setalaranja_etr:1060264240247738508>Ser um servidor organizado \n\n<a:setalaranja_etr:1060264240247738508> Não ter uma staff tóxica\n\n<a:setalaranja_etr:1060264240247738508>Não ser um servidor focado em conteúdo NSFW/Gore\n\n <a:setalaranja_etr:1060264240247738508>Não fechamos parcerias com servidores anárquicos, servidores de rewards e servidores de hype\n\n<a:setalaranja_etr:1060264240247738508>Ter um canal para a parceria\n\n<a:setalaranja_etr:1060264240247738508>Caso o representante saia do servidor a parceria será desfeita\n\n <a:setalaranja_etr:1060264240247738508>Ter pelo menos 175 membros,caso contrario terão que marcar @everyone no nosso convite\n\n <a:setalaranja_etr:1060264240247738508>Servidor tem que ser focado em conteúdo Geek(Anime's,Manga,Gamer,Marvel,Dc,etc..)\n\n <a:setalaranja_etr:1060264240247738508>So aceitaremos a parceria caso o seu servidor seja ativo, caso contrário não iremos realizar a parceria**\n\n ** <a:setalaranja_etr:1060264240247738508> Marcar everyone ou um ping de parcerias**",
        color: parseInt("#ffcf1b".slice(1), 16),
        image: {
          url: "https://i.imgur.com/EQQ0rHX.jpg",
        },
        footer: {
          text: "©️ 2023 Anime's Eternity Todos os direitos reservados.",
        },
      },
    ],
    components: [row],
  });
};
