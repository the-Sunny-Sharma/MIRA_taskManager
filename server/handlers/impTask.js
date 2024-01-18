const { MongoClient } = require("mongodb");
const con = require("../config/dbConfig");

const impTask = (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("taskManager");
  const coll = db.collection("tasks");
  coll
    .find({ status: "important" })
    .toArray()
    .then((result) => {
      if (result.length === 0) {
        return res.send({ message: "No important tasks to show" });
      }
      return res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = impTask;
