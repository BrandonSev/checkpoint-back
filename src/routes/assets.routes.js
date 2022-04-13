const { AssetController } = require("../controllers");

const assetsRouter = require("express").Router();

assetsRouter.get("/", AssetController.findMany);
assetsRouter.get("/:id", AssetController.findOneById);

assetsRouter.post("/", AssetController.createOne);

assetsRouter.put("/:id", AssetController.updateOneById);

assetsRouter.delete("/:id", AssetController.removeOneById);

module.exports = assetsRouter;
