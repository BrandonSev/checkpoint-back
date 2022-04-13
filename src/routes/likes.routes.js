const { LikeController } = require("../controllers");

const likesRouter = require("express").Router();

likesRouter.get("/", LikeController.findMany);
likesRouter.get("/:id", LikeController.findOneById);

likesRouter.post("/", LikeController.createOne);

likesRouter.put("/:id", LikeController.updateOneById);

likesRouter.delete("/:id", LikeController.deleteOneById);

module.exports = likesRouter;
