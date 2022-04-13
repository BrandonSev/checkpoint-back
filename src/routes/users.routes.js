const { UserController, AssetController } = require("../controllers");
const { validatePostUser, validatePutUser } = require("../middleware/User");

const usersRouter = require("express").Router();

usersRouter.get("/", UserController.findMany);
usersRouter.get("/:id", UserController.findOneById);

usersRouter.post("/", AssetController.uploadAssets, validatePostUser, UserController.createOne);

usersRouter.put("/:id", AssetController.uploadAssets, validatePutUser, UserController.updateOneById);

usersRouter.delete("/:id", UserController.deleteOneById);

module.exports = usersRouter;
