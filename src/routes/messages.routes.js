const messageRouter = require("express").Router();
const { MessageController } = require("../controllers");
const { validatePostMessage, validatePutMessage } = require("../middleware/Message");

messageRouter.get("/", MessageController.findMany);

messageRouter.post("/", validatePostMessage, MessageController.createOne);

messageRouter.put("/:id", validatePutMessage, MessageController.updateOneById);

messageRouter.delete("/:id", MessageController.deleteOneById);

module.exports = messageRouter;
