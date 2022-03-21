const express = require("express")
const cors = require("cors")
const databaseConnection = require("./database/mongodbConnection")
const { PORT } = require('./config/index');
const api = require("./controller/api");

const StartServer = async () => {
  const app = express()

  await databaseConnection()
  app.use(express.json({ limit: "1mb" }));
  app.use(cors())
  api(app)
  app.listen(PORT, () => { console.log(`lintening to port ${PORT}`) })
    .on("error", (err) => {
      console.log(err); process.exit();
    })
}
StartServer()