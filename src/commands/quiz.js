const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Quiz!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setNameLocalizations({ "pt-BR": "criar", "en-US": "create" })
        .setDescription("Criar uma pergunta")
        .addStringOption((option) =>
          option
            .setName("questão")
            .setNameLocalizations({ "pt-BR": "questão", "en-US": "question" })
            .setDescription("Identifique a questão")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("resposta")
            .setNameLocalizations({ "pt-BR": "resposta", "en-US": "answer" })
            .setDescription("Identifique a resposta")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("dificuldade")
            .setDescription("Identifique a dificuldade")
            .addChoices(
              { name: "Fácil", value: "Easy" },
              { name: "Médio", value: "Medium" },
              { name: "Difícil", value: "Hard" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setNameLocalizations({ "pt-BR": "lista", "en-US": "lista" })
        .setDescription("Listar todas as perguntas em um TXT")
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options._subcommand;
    switch (subcommand) {
      case "create": {
        const _id = interaction.options.getString("questão");
        const answer = interaction.options.getString("resposta");
        const difficulty = interaction.options.getString("dificuldade");
        new client.dbm.Questions({
          _id,
          answer,
          difficulty,
        }).save();
        interaction.reply({ content: "Criado com sucesso!" });
        break;
      }
      case "list": {
        const doc = await client.dbm.Questions.find({});
        if (doc) {
          let d = doc
            .map((question) => {
              return `Q: ${question._id} (Dificuldade: ${question.difficulty
                .replace("Easy", "Fácil")
                .replace("Medium", "Médio")
                .replace("Hard", "Difícil")})\nR:${question.answer}`;
            })
            .join("\n\n");
          const lista = await new discord.AttachmentBuilder(Buffer.from(d), {
            name: "quiz.txt",
          });
          interaction.reply({
            content:
              "Eu sou o rei do fogo! Mas quando se trata de quiz, eu sou o bobo da corte... Aqui está, majestosa corte!",
            files: [lista],
          });
        }
        break;
      }
    }
  },
};
