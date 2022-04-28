const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const businessRouter = require("./business.routes");
const assetsRouter = require("./assets.routes");
const likesRouter = require("./likes.routes");
const authRouter = require("./auth.routes");
const conversationRouter = require("./conversations.routes");
const messageRouter = require("./messages.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/business", businessRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/likes", likesRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/conversations", conversationRouter);
mainRouter.use("/messages", messageRouter);

module.exports = mainRouter;
