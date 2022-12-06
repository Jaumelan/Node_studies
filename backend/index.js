const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const db = require("./DB.js");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/games", (req, res) => {
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

app.get("/game/:id", (req, res) => {
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

app.post("/game", (req, res) => {
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

app.delete("/game/:id", (req, res) => {
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

app.put("/game/:id", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
