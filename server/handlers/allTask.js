const { MongoClient } = require("mongodb");

const allTask = (req, res) => {
  const { username } = req.query;
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("taskManager");
  const coll = db.collection("tasks");

  coll
    .find({ username: username })
    .toArray()
    .then((result) => {
      if (result.length === 0) {
        return res.send({ message: "No Tasks" });
      }
      console.log(result);
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    });
};

module.exports = allTask;
