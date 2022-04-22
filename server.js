/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mainRouter = require("./src/routes");
const { connection } = require("./db-connection");

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("assets"));
app.use("/verifyToken", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    return jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        req.user = null;
        return res.status(404).send({ message: "Utilisateur introuvable" });
      }
      if (decodedToken.isBusiness) {
        return res.status(200).json({ id: decodedToken.id, business: decodedToken.data });
      }
      return res.status(200).json({ id: decodedToken.id, user: decodedToken.data });
    });
  }
  return res.status(403).send();
});

// Prefix all routes with /api
app.use("/api", mainRouter);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) return console.log(err.message);
  console.log(`La connexion au serveur a réussi: http://localhost:${process.env.PORT || 8000}`);
  // Test connexion to MYSQL DB
  return connection.connect((err2) => {
    if (err) return console.log(err2.message);
    return console.log(`La connexion a la base de donnée a réussi`);
  });
});

module.exports = app;
