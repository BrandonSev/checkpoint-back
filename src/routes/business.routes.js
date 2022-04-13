const { BusinessController } = require("../controllers");

const businessRouter = require("express").Router();

businessRouter.get("/", BusinessController.findMany);
businessRouter.get("/:id", BusinessController.findOneById);

businessRouter.post("/", BusinessController.createOne);

businessRouter.put("/:id", BusinessController.updateOneById);

businessRouter.delete("/:id", BusinessController.deleteOneById);

module.exports = businessRouter;
