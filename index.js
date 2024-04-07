const express = require("express");
const app = express();
require('dotenv').config();
const logger = require("morgan");
const people = require("./routes/people");
const db = require("./database");
const PORT = 3000;
const mongoUri = process.env.MONGO_URI;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use("/people", people);

const database = new db(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.connect().catch((err) => console.log(err));

process.on("SIGINT", async () => {
  try {
    await database.disconnect();
    console.log("disconnecting database gracefully");
  } catch (error) {
    console.log("disconnecting failed");
    process.exit(1);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
