const businessRouter = require("express").Router();
const { BusinessController, AssetController } = require("../controllers");
const { validatePostBusiness, validatePutBusiness } = require("../middleware/Business");

businessRouter.get("/", BusinessController.findMany);
businessRouter.get("/:id", BusinessController.findOneById);
businessRouter.get("/:id/likes", BusinessController.findOneByIdWithLikes);

businessRouter.post("/", AssetController.uploadAssets, validatePostBusiness, BusinessController.createOne);

businessRouter.put("/:id", AssetController.uploadAssets, validatePutBusiness, BusinessController.updateOneById);

businessRouter.delete("/:id", BusinessController.deleteOneById);

module.exports = businessRouter;
