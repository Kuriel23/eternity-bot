const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");
const schedule = require("node-schedule");

module.exports = async (client) => {
  schedulers();

  async function schedulers() {
    client.dbm.Guilds.findOne({ _id: "1" }, async function (err, not) {
      if (err) return 0;
      not.vipschedule.forEach((vips) => {
        schedule.scheduleJob(vips.schedule, function () {
          const cargo = vips.vip
            .replace("Shinigami", "937040032718536734")
            .replace("Hunter", "937040400126984242")
            .replace("Slayer", "937039457457160322")
            .replace("Death Note", "937041568299368508");

          const person = client.guilds.cache
            .get("936656115524042823")
            .members.cache.get(vips._id);
          person.roles.remove(cargo);
          not.vipschedule.pull({ _id: vips._id });
        });
      });
      not.partnerschedule.forEach((partner) => {
        schedule.scheduleJob(partner.schedule, function () {
          const person = client.guilds.cache
            .get("936656115524042823")
            .members.cache.get(partner._id);
          person.roles.remove("939904131940900885");
          not.partnerschedule.pull({ _id: partner._id });
        });
      });
      await not.save();
    });
  }
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({
    version: "10",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") {
        // If the bot is in production mode it will load slash commands for all guilds
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(
          `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
            "Sucesso registrado comandos globalmente"
          )}`
        );
      } else {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(
          `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
            "Sucesso registrado comandos localmente"
          )}`
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  client.user.setPresence({
    activities: [
      { name: `Recrutando Staffs Para o 永遠 Anime's Eternity`, type: 0 },
    ],
    status: "dnd",
  });
};
