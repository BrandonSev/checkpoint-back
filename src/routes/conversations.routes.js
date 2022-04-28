const conversationsRouter = require("express").Router();
const { ConversationController, MessageController } = require("../controllers");
const { validatePostConversation } = require("../middleware/Conversation");

conversationsRouter.get("/", ConversationController.findMany);
conversationsRouter.get("/:id", ConversationController.findOneById);
conversationsRouter.get("/:id/messages", MessageController.findMessagesByConversationId);
conversationsRouter.get("/users/:id", ConversationController.findConversationsByUserId);

conversationsRouter.post("/", validatePostConversation, ConversationController.createOne);

conversationsRouter.delete("/:id", ConversationController.deleteOneById);

module.exports = conversationsRouter;
