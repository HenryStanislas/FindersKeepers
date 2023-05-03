const express = require("express")
const app = express()
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/jp';
console.log("app");


const UserChecker = (req, res, next) => {
  console.log(req.body); // add this line to log the request body
  const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
  }
  for (let attr in user) {
      if (user[attr] === undefined)
          return res.status(400).json({ error: "Bad user parameters." })
  }
  next()
}
 
MongoClient.connect(url)
.then(client => client.db("FindersKeepers_signin").collection("users"))
.then(users => {

    console.log("55");
    let tab = ["un", "deux"];

    app.get("/list", (req, res) => {
      console.log("coucou");
      // users.find().toArray().then(items => res.json(items));
    })
    app.get("/", (req, res) => {
      console.log("root");
      res.json(tab);
    })

    app.post("/signin", (req, res) => {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH");
			const user = {
				username: req.body.username,
		    password: req.body.password,
        email: req.body.email
			}
			users
    .insertOne(user)
    .then(result => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error inserting user into database" });
    });
		})


    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => { throw err })
