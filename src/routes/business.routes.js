const { BusinessController, AssetController } = require("../controllers");
const { validatePostBusiness, validatePutBusiness } = require("../middleware/Business");

const businessRouter = require("express").Router();

businessRouter.get("/", BusinessController.findMany);
businessRouter.get("/:id", BusinessController.findOneById);

businessRouter.post("/", AssetController.uploadAssets, validatePostBusiness, BusinessController.createOne);

businessRouter.put("/:id", AssetController.uploadAssets, validatePutBusiness, BusinessController.updateOneById);

businessRouter.delete("/:id", BusinessController.deleteOneById);

module.exports = businessRouter;
