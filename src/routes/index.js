const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const businessRouter = require("./business.routes");
const assetsRouter = require("./assets.routes");
const likesRouter = require("./likes.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/business", businessRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/likes", likesRouter);

module.exports = mainRouter;
