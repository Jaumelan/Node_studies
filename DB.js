const sqlite3 = require("sqlite3").verbose();

const DB = "db.sqlite";
//const DBUsers = "users.sqlite";

let db = new sqlite3.Database(DB, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text UNIQUE, 
            year number, 
            price number, 
            CONSTRAINT title_unique UNIQUE (title)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO games (title, year, price) VALUES (?,?,?)";
          db.run(insert, ["Call of Duty MW", 2019, 60]);
          //console.log("New row added");
          db.run(insert, ["Sea of Thieves", 2018, 40]);
          db.run(insert, ["Minecraft", 2012, 20]);
        }
      }
    );
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          //console.log(err)
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO users (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@admin.com", "admin"]);
          //console.log("New row added to users");
        }
      }
    );
  }
});

module.exports = db;
