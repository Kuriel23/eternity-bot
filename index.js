const discord = require("discord.js");
require("dotenv").config();
const { QuickDB } = require("quick.db");
const schedule = require("node-schedule");

const client = new discord.Client({
  intents: 3276799,
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

client.cor = "#FFA500";
client.db = new QuickDB();
client.dbm = require("./database");
client.canais = {
  logs: "1025780160437432330",
  errors: "1047219954015031386",
};
client.msg = {
  embeds: {
    nopermmod: new discord.EmbedBuilder()
      .setAuthor({
        name: `» Para usar este comando você deverá ser da equipe de moderação.`,
        iconURL: client.err,
      })
      .setColor(client.cor),
  },
};

process.on("unhandledRejection", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
  client.channels.cache
    .get(client.canais.errors)
    .send("Erro detectado: \n" + error);
});

schedule.scheduleJob("0 3 * * */1", async function () {
  const results = await client.db.all();
  await client.channels.cache.get("1068214966286565437").send({
    content:
      "Resultados das parcerias de hoje: \n" +
      results
        .map(function (callback) {
          return `<@${callback.id}> - ${callback.value.parcerias}`;
        })
        .join("\n"),
  });
  await client.db.deleteAll();
});

const boilerplateComponents = async () => {
  await require("./src/util/boilerplateClient")(client);
};

boilerplateComponents();
