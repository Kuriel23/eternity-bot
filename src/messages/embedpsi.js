const discord = require("discord.js");

module.exports = async (client, message) => {
  message.delete();
  const btt = new discord.ButtonBuilder()
    .setCustomId("psicologos")
    .setStyle(1)
    .setLabel("Consultar um psicólogo");
  const row = new discord.ActionRowBuilder().setComponents(btt);
  message.channel.send({
    embeds: [
      {
        fields: [
          {
            name: "<:White_butterfly_etr:1061740110334398514> Para consultar o psicólogo",
            value:
              '** <a:brilhin_white_etr:1061740340064829441> Basta abrir um ticket no <#1058385359374913556>, esse ticket será totalmente fechado, só psicólogos e administradores do servidor terão acesso ao ticket, se preferir desabafar com os membros sem o aconselhamento de um "Psicólogo" do servidor bastar ir em <#1068723620400091167> <:heartwhitekonan_etr:1061741816896049242> **',
            inline: false,
          },
        ],
        title: "<a:White_Bow_etr:1061740225199620096> 永遠 Psicólogos",
        description:
          '\n**<:white_fixado_etr:1061742186082865152> O <@&1020139519850336338> será responsável por orientar/ajudar os membros com diversos problemas mentais/sociais, e os staffs com esse cargo também poderão mandar textos motivacionais no <#1058385256018890862>, os desabafos serão completamente fechado, para o membro e o "Psicólogo", dando assim total privacidade ao membro e o staff que irá lhe atender <a:brilhin_white_etr:1061740340064829441>**',
        color: 13613497,
        footer: {
          text: "©️ 2023 永遠 Anime's Eternity Todos os direitos reservados.",
        },
        image: {
          url: "https://media.discordapp.net/attachments/952618968433180692/1061675052451516446/eternity_emilia.png?width=1406&height=569",
        },
      },
    ],
    components: [row],
  });
};
