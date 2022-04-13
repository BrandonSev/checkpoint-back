const { UserController } = require("../controllers");

const usersRouter = require("express").Router();

usersRouter.get("/", UserController.findMany);
usersRouter.get("/:id", UserController.findOneById);

usersRouter.post("/", UserController.createOne);

usersRouter.put("/:id", UserController.updateOneById);

usersRouter.delete("/:id", UserController.deleteOneById);

module.exports = usersRouter;
