require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./src/routes");
const { connection } = require("./db-connection");
const cookieParser = require("cookie-parser");
const { User } = require("./src/models");

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("assets"));
app.use("/verifyToken", (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        req.user = null;
        next();
      } else {
        const [[user]] = await User.findOneById(decodedToken.id);
        req.user = user;
        return res.status(200).json({ id: user.id, user });
      }
    });
  }
  req.user = null;
  return res.status(403).send();
});

// Prefix all routes with /api
app.use("/api", mainRouter);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) return console.log(err.message);
  console.log(`La connexion au serveur a réussi: http://localhost:${process.env.PORT || 8000}`);
  // Test connexion to MYSQL DB
  connection.connect((err) => {
    if (err) return console.log(err.message);
    console.log(`La connexion a la base de donnée a réussi`);
  });
});

module.exports = app;
