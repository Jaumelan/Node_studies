const sqlite3 = require("sqlite3").verbose();

const DBSource = "db.sqlite";

let db = new sqlite3.Database(DBSource, (err) => {
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
          console.log("New row added");
          db.run(insert, ["Sea of Thieves", 2018, 40]);
          db.run(insert, ["Minecraft", 2012, 20]);
        }
      }
    );
  }
});

module.exports = db;
