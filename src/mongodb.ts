// @ts-ignore
import { parseConnectionString as parse } from "mongodb-core";
import { MongoClient } from "mongodb";
import { Application } from "./declarations";
const logger = require("./logger");

export default function(app: Application) {
  const config = app.get("MONGODB_URI");
  const promise = MongoClient.connect(config, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(client => {
      const dbName = parse(config, () => {});
      return client.db(dbName);
    })
    .catch(error => {
      logger.error(error);
    });

  app.set("mongoClient", promise);
}
