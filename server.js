/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");

const app = express();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});
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

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ owner_id, receiver_id, message }) => {
    const user = getUser(...receiver_id);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        owner_id,
        ...receiver_id,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 8000, (err) => {
  if (err) return console.log(err.message);
  console.log(`La connexion au serveur a réussi: http://localhost:${process.env.PORT || 8000}`);
  // Test connexion to MYSQL DB
  return connection.connect((err2) => {
    if (err) return console.log(err2.message);
    return console.log(`La connexion a la base de donnée a réussi`);
  });
});

module.exports = app;
