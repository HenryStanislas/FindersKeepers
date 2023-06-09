require("dotenv").config();
const express = require("express")
const app = express()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
app.use(express.json());
const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/FindersKeepers_db';
console.log("app");

// Enable CORS for all domains
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});



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
  .then(client => {
    const db = client.db("FindersKeepers_db");
    const users = db.collection("users");
    const caches = db.collection("caches");

    app.get("/", (req, res) => {
      console.log("root");
      res.json(tab);
    })

    // ROUTE POUR SIGN UP

    app.post("/signup", (req, res) => {
      const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
    
      // Check if user exists
      users.findOne({ username: user.username })
        .then(existingUser => {
          if (existingUser) {
            return res.status(201).json({ error: "Username already exists" });
          } else {
            users.findOne({ email: user.email })
              .then(existingUserWithEmail => {
                if (existingUserWithEmail) {
                  return res.status(201).json({ error: "Email already exists. Please log in instead" });
                } else {
                  // Validate email format
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(user.email)) {
                    return res.status(201).json({ error: "Invalid email format" });
                  }
    
                  // Validate username length
                  if (user.username.length < 3) {
                    return res.status(201).json({ error: "Username must have at least 3 letters" });
                  }
    
                  users.insertOne(user)
                    .then(result => {
                      res.status(201).json({ message: "User created successfully!" });
                    })
                    .catch(err => {
                      console.error(err);
                      res.status(201).json({ error: "Error inserting user into database" });
                    });
                }
              })
              .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
              });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        });
    });

    // ROUTE POUR LOG IN

    app.post("/login", (req, res) => {
      const { username, password } = req.body;
      users.findOne({ username })
        .then(user => {
          if (!user) {
            console.log("user not found");
            return res.status(201).json({ error: "Username does not exist" });
            
          } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              if (err) {
                throw err;
              } else {
                bcrypt.compare(user.password, hash, function (err, result) {
                  if (err) {
                    throw err;
                  }
                  console.log(result);
                  if (!result) {
                    return res.status(201).json({ error: "Invalid password" });
                  } else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });

                    return res.status(201).json({ message: "Connected!", token });
                  }
                });
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: "Internal server error 2" });
        });
    });

    app.post("/cache", (req, res) => {
      const cache = {
        username: req.body.username,
        location: req.body.location,
        difficulty: req.body.difficulty,
      };
    
      caches.insertOne(cache)
        .then(result => {
          res.status(201).json({ message: "Cache created successfully!" });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        });
    });

    app.get("/cache", async (req, res) => {
      try { 
        const caches = await db.collection("caches").find().toArray();
        res.json(caches);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });


    app.post('/comment/', async (req, res) => {
      const { username, comment,cacheID, foundCache} = req.body;
      console.log(foundCache);
      try {
        const commentDoc = { cacheID, username, comment, foundCache };
        const result = await db.collection('comments').insertOne(commentDoc);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/comment/:cacheID', async (req, res) => {
      try {
        const cacheID = req.params.cacheID;
        const comments = await db.collection("comments").find({ cacheID }).toArray(); // Only get comments for the specific cache ID
        res.json(comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

    app.get('/comment/', async (req, res) => {
      try {
        
        const comments = await db.collection("comments").find().toArray(); //get all comments
        res.json(comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

    app.delete('/cache/:cacheID', async (req, res) => {
      const cacheId = req.params.cacheID;
      if (!ObjectId.isValid(cacheId)) {
        res.status(400).send('Invalid cache ID');
        return;
      }
      try {
        const result = await db.collection("caches").deleteOne({_id: new ObjectId(cacheId)});
        if (result.deletedCount === 0) {
        } else {
          console.log("t le goat");
          console.log(result.deletedCount);
        }
      } catch (error) {
        console.error(error);
      }
    });
    
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => { throw err })
 