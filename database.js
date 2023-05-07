const { connect, Schema, model, set } = require("mongoose");
const { ChalkAdvanced } = require("chalk-advanced");
set("strictQuery", true);
connect(process.env.db, {})
  .then(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
        "✅ • Carregado com sucesso [BANCO DE DADOS]"
      )}`
    )
  )
  .catch(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.red(
        "❎ • Conexão do banco de dados falhada"
      )}`
    )
  );

const guildSchema = new Schema({
  _id: { type: String, required: true },
  vipschedule: [
    {
      _id: String,
      vip: String,
      schedule: Date,
    },
  ],
  roleschedule: [
    {
      _id: String,
      role: String,
      schedule: Date,
    },
  ],
  partnerschedule: [
    {
      _id: String,
      schedule: Date,
    },
  ],
});

const staffsSchema = new Schema({
  _id: { type: String, required: true },
  cargo: String,
  days: [
    {
      0: Boolean,
      1: Boolean,
      2: Boolean,
      3: Boolean,
      4: Boolean,
      5: Boolean,
      6: Boolean,
    },
  ],
  ausente: [
    {
      status: Boolean,
      endTime: Date,
    },
  ],
  weekStatus: [
    {
      messages: Number,
    },
  ],
});

const userSchema = new Schema({
  _id: { type: String, required: true },
  vips: {
    roleid: String,
    rolelimit: { type: Number, default: 0 },
    channelimit: { type: Number, default: 0 },
  },
  coins: Number,
});

const questionSchema = new Schema({
  _id: { type: String, required: true },
  answer: String,
  difficulty: String,
});

module.exports.Staffs = model("Staffs", staffsSchema);
module.exports.Guilds = model("Guilds", guildSchema);
module.exports.Users = model("Users", userSchema);
module.exports.Questions = model("Questions", questionSchema);
