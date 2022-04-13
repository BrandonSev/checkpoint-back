const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const businessRouter = require("./business.routes");
const assetsRouter = require("./assets.routes");
const likesRouter = require("./likes.routes");
const authRouter = require("./auth.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/business", businessRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/likes", likesRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
