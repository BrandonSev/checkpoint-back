const assetsRouter = require("express").Router();
const { AssetController } = require("../controllers");

assetsRouter.get("/", AssetController.findMany);
assetsRouter.get("/:id", AssetController.findOneById);

assetsRouter.post("/", AssetController.createOne);

assetsRouter.put("/:id", AssetController.updateOneById);

assetsRouter.delete("/:id", AssetController.removeOneById);

module.exports = assetsRouter;
