const likesRouter = require("express").Router();
const { LikeController } = require("../controllers");
const { validatePostLikes, validatePutLike } = require("../middleware/Like");

likesRouter.get("/", LikeController.findMany);
likesRouter.get("/:id", LikeController.findOneById);

likesRouter.post("/", validatePostLikes, LikeController.createOne);

likesRouter.put("/:id", validatePutLike, LikeController.updateOneById);

likesRouter.delete("/:id", LikeController.deleteOneById);

module.exports = likesRouter;
