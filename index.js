const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3002;
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("senha1"));
app.use(
  session({
    secret: "app1",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.get("/", (req, res) => {
  let emailErrors = req.flash("emailErrors");
  let nameErrors = req.flash("nameErrors");
  let pontosErrors = req.flash("pontosErrors");

  emailErrors =
    emailErrors === undefined || emailErrors.length === 0
      ? null
      : emailErrors[0];

  nameErrors = 
    nameErrors === undefined || nameErrors.length === 0
      ? null
      : nameErrors[0];

  pontosErrors =
    pontosErrors === undefined || pontosErrors.length === 0
      ? null
      : pontosErrors[0];


  res.render("index", {
    emailErrors,
    nameErrors,
    pontosErrors,
    name: req.flash("name"),
    email: req.flash("email"),
    pontos: req.flash("pontos"),
    });
  
});

app.post("/form", (req, res) => {
  const { name, email, pontos } = req.body;
  //console.log(req.body);
  let emailErrors;
  let nameErrors;
  let pontosErrors;

  if (email === undefined || email === "") {
    emailErrors = "Email não pode estar vazio";
  }
  if (pontos === undefined || pontos < 20) {
    pontosErrors = "Pontos não pode ser menor a 20";
  }
  if (name === undefined || name === "" || name === null) {
    nameErrors = "Nome não pode estar vazio";
  }
  if (name.length < 4) {
    nameErrors = "Nome não pode ter menos de 4 caracteres";
  }
  if (emailErrors || nameErrors || pontosErrors) {
    req.flash("emailErrors", emailErrors);
    req.flash("nameErrors", nameErrors);
    req.flash("pontosErrors", pontosErrors);
    req.flash("name", name)
    req.flash("email", email)
    req.flash("pontos", pontos)
    res.redirect("/");
  } else {
    res.send("sucesso");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
