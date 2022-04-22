const usersRouter = require("express").Router();
const { UserController, AssetController } = require("../controllers");
const { validatePostUser, validatePutUser, validatePutCvUser } = require("../middleware/User");

usersRouter.get("/", UserController.findMany);
usersRouter.get("/:id", UserController.findOneById);
usersRouter.get("/:id/likes", UserController.findOneByIdWithlikes);

usersRouter.post("/", AssetController.uploadAssets, validatePostUser, UserController.createOne);

usersRouter.put("/:id", AssetController.uploadAssets, validatePutUser, UserController.updateOneById);
usersRouter.put("/:id/cv", AssetController.uploadCv, validatePutCvUser, UserController.updateOneById);

usersRouter.delete("/:id", UserController.deleteOneById);

module.exports = usersRouter;
