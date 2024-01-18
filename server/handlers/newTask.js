const { MongoClient } = require("mongodb");

const newTask = (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("taskManager");
  const coll = db.collection("tasks");
  const record = {
    username: req.body.username,
    description: req.body.description,
    status: req.body.status,
    addedOn: req.body.addedOn,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res.send(result);
      console.log("New Task : " + req.body.description);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = newTask;
