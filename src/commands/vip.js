const discord = require("discord.js");
const schedule = require("node-schedule");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("vip")
    .setDescription("Coisas para vips!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("register")
        .setNameLocalizations({ "pt-BR": "registrar", "en-US": "register" })
        .setDescription("Registre alguém")
        .addUserOption((option) =>
          option
            .setName("usuário")
            .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
            .setDescription("Identifique o utilizador")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("vip")
            .setDescription("Identifique o cargo de vip")
            .addChoices(
              { name: "Shinigami", value: "Shinigami" },
              { name: "Hunter", value: "Hunter" },
              { name: "Slayer", value: "Slayer" },
              { name: "Death Note", value: "Death Note" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create_role")
        .setNameLocalizations({
          "pt-BR": "criar_cargo",
          "en-US": "create_role",
        })
        .setDescription("Crie um cargo")
        .addStringOption((option) =>
          option
            .setName("nome")
            .setNameLocalizations({ "en-US": "name", "pt-BR": "nome" })
            .setDescription("Defina um nome ao seu cargo")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("hex")
            .setDescription("Defina um código Hex (Ex: #000000)")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create_channel")
        .setNameLocalizations({
          "pt-BR": "criar_canal",
          "en-US": "create_channel",
        })
        .setDescription("Crie um canal de voz")
        .addStringOption((option) =>
          option
            .setName("nome")
            .setNameLocalizations({ "en-US": "name", "pt-BR": "nome" })
            .setDescription("Defina um nome ao seu canal")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("share_role")
        .setNameLocalizations({
          "pt-BR": "partilhar_cargo",
          "en-US": "share_role",
        })
        .setDescription(
          "Partilhe para até no máximo 4 pessoas este cargo, basta só o usar."
        )
        .addUserOption((option) =>
          option
            .setName("amigo")
            .setNameLocalizations({ "en-US": "friend", "pt-BR": "amigo" })
            .setDescription("Partilhe com um amigo o seu cargo.")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options._subcommand;
    switch (subcommand) {
      case "share_role": {
        const amigo = interaction.options.getMember("amigo");
        const person2 = interaction.guild.members.cache.get(amigo.id);
        client.dbm.Users.findOne(
          { _id: interaction.member.id },
          function (err, doc) {
            if (err) return 0;
            if (doc) {
              if (doc.roleid !== "")
                return interaction.reply({
                  content:
                    "Parece que não sei qual o id do seu cargo de vip, uma ação manual foi acionada para esse seu cargo.",
                });
              if (doc.rolelimit >= 4)
                return interaction.reply({
                  content:
                    "Calma aí! Parece que você já deu o seu cargo para 4 amigos.",
                });
              person2.roles.add(doc.roleid);
              doc.rolelimit += 1;
              doc.save();
              interaction.reply({
                content: "Dei o cargo para o seu amigo!",
              });
            } else {
              return interaction.reply({
                content: "Que estranho seu dado não foi encontrado aqui.",
              });
            }
          }
        );
        break;
      }
      case "register": {
        const pessoa = interaction.options.getUser("usuário");
        const vip = interaction.options.getString("vip");

        if (!interaction.member.permissions.has("BanMembers"))
          return interaction.reply({
            content: "Você não está permitido a colocar usuários como VIP's.",
            ephemeral: true,
          });

        client.dbm.Guilds.findOne({ _id: "1" }, function (err, doc) {
          if (err) return 0;
          const _date = new Date();
          _date.setMonth(_date.getMonth() + 1);
          const date = new Date(_date);
          doc.vipschedule.push({
            _id: pessoa.id,
            vip,
            schedule: date,
          });
          doc.save();

          const cargo = vip
            .replace("Shinigami", "937040032718536734")
            .replace("Hunter", "937040400126984242")
            .replace("Slayer", "937039457457160322")
            .replace("Death Note", "937041568299368508");

          const person = interaction.guild.members.cache.get(pessoa.id);
          person.roles.add(cargo);

          interaction.reply({ content: "Registrado com sucesso." });

          schedule.scheduleJob(date, function () {
            person.roles.remove(cargo);
            doc.vipschedule.pull({ _id: pessoa.id });
            doc.save();
          });
        });
        break;
      }
      case "create_role": {
        const nome = interaction.options.getString("nome");
        const hex = interaction.options.getString("hex") || "#FFFFFF";
        if (!hex.startsWith("#"))
          return interaction.reply({
            content: "A cor definida não têm # no início.",
          });

        if (!isHexColor(hex.replace("#", "")) === true) {
          return interaction.reply({
            content: "Essa cor não está definida corretamente.",
          });
        }

        function isHexColor(hex) {
          return (
            typeof hex === "string" &&
            hex.length === 6 &&
            !isNaN(Number("0x" + hex))
          );
        }

        interaction.guild.roles
          .create({
            name: nome,
            color: hex,
            reason: "Novo cargo para VIP's",
          })
          .then((role) => {
            interaction.member.roles.add(role);
            client.db.Users.findOne(
              { _id: interaction.member.id },
              function (err, doc) {
                if (err) return 0;
                if (doc) {
                  doc.vips.roleid = role.id;
                  doc.save();
                } else {
                  new client.db.Users({
                    _id: interaction.member.id,
                    vips: { roleid: role.id },
                  }).save();
                }
              }
            );
          });

        interaction.reply({ content: "Seu cargo foi criado com sucesso!" });
        break;
      }
      case "create_channel": {
        interaction.guild.channels
          .create({
            name: interaction.options.getString("nome"),
            type: 2,
            parent: "1035669211692929067",
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [discord.PermissionFlagsBits.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [
                  discord.PermissionFlagsBits.ViewChannel,
                  discord.PermissionFlagsBits.SendMessages,
                  discord.PermissionFlagsBits.AttachFiles,
                  discord.PermissionFlagsBits.AddReactions,
                  discord.PermissionFlagsBits.Connect,
                  discord.PermissionFlagsBits.UseVAD,
                  discord.PermissionFlagsBits.Speak,
                  discord.PermissionFlagsBits.RequestToSpeak,
                ],
              },
            ],
          })
          .then((c) => {
            interaction.reply({
              content: `Seu canal foi criado em: ${c}`,
              ephemeral: true,
            });
          });
        break;
      }
    }
  },
};
