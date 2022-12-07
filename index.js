const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const db = require("./DB.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_KEY = "exer1";
const auth = require("./middleware");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/games", auth, (req, res) => {
  const { id, email } = req.user;
  const userSql = "select email from users where id =?";
  const userParams = [id];
  db.get(userSql, userParams, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row.email !== email) {
      res.status(400).json({ error: "Invalid user" });
      return;
    }
  });

  const sql = "select * from games";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/game/:id", auth, (req, res) => {
  const { id, email } = req.user;
  const userSql = "select email from users where id =?";
  const userParams = [id];
  db.get(userSql, userParams, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row.email !== email) {
      res.status(400).json({ error: "Invalid user" });
      return;
    }
  });

  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const sql = "select * from games where id = ?";
    const params = [id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: row,
      });
    });
  }
});

app.post("/game", auth, (req, res) => {
  const { id, email } = req.user;
  const userSql = "select email from users where id =?";
  const userParams = [id];
  db.get(userSql, userParams, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row.email !== email) {
      res.status(400).json({ error: "Invalid user" });
      return;
    }
  });

  const { title, price, year } = req.body;
  const priceNum = Number(price);
  const yearNum = Number(year);
  if (typeof title === "string") {
    if (typeof priceNum === "number" && priceNum >= 0) {
      if (typeof yearNum === "number" && yearNum >= 0) {
        const sql = "insert into games (title, price, year) values (?,?,?)";
        const params = [title, priceNum, yearNum];
        db.run(sql, params, function (err, result) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "success",
            data: {
              id: this.lastID,
              title: title,
              price: priceNum,
              year: yearNum,
            },
          });
        });
      } else {
        res.sendStatus(400);
      }
    }
  } else {
    res.sendStatus(400);
  }
});

app.delete("/game/:id", auth, (req, res) => {
  const { id, email } = req.user;
  const userSql = "select email from users where id =?";
  const userParams = [id];
  db.get(userSql, userParams, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row.email !== email) {
      res.status(400).json({ error: "Invalid user" });
      return;
    }
  });

  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    //console.log(id);
    const sql = "delete from games where id = ?";
    const params = [id];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    });
  }
});

app.put("/game/:id", auth, (req, res) => {
  const { id, email } = req.user;
  const userSql = "select email from users where id =?";
  const userParams = [id];
  db.get(userSql, userParams, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row.email !== email) {
      res.status(400).json({ error: "Invalid user" });
      return;
    }
  });
  
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const { title, price, year } = req.body;

    const sql =
      "update games set title = coalesce(?, title), year = coalesce(?, year), price = coalesce(?, price) where id = ?";
    const params = [title, Number(year), Number(price), Number(id)];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: {
          id: id,
          title: title,
          price: price,
          year: year,
        },
        changes: this.changes,
      });
    });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof password === "string"
  ) {
    let hashedPass;
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        hashedPass = hash;
        const sql = "insert into users (name, email, password) values (?,?,?)";
        const params = [name, email, hashedPass];
        //console.log(hashedPass);
        db.run(sql, params, function (err, result) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "success",
            data: {
              id: this.lastID,
              name: name,
              email: email,
              password: password,
            },
          });
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  if (typeof email === "string" && typeof password === "string") {
    const sql = "select * from users where email = ?";
    const params = [email];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (row === undefined) {
        res.status(400).json({ error: "Invalid email" });
        return;
      }
      bcrypt.compare(password, row.password, (err, result) => {
        if (result) {
          jwt.sign(
            { id: row.id, email: row.email },
            JWT_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              } else {
                res.json({
                  message: "success",
                  data: {
                    name: row.name,
                    email: row.email,
                  },
                  token,
                });
              }
            }
          );
        } else {
          res.status(400).json({ error: "Invalid password" });
        }
      });
    });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
