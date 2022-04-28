const { Conversation } = require("../../models");

const validatePostMessage = (req, res, next) => {
  const { message, conversation_id, owner_id } = req.body;
  if (!message && !conversation_id && !owner_id) return res.status(422).send({ message: "Une erreur est survenue lors de la création du message" });
  req.newMessage = { message, conversation_id, owner_id };
  return next();
};

const validatePutMessage = async (req, res, next) => {
  const { message, conversation_id } = req.body;
  if (!message && !conversation_id) return res.status(422).send({ message: "Une erreur est survenue lors de la création du message" });
  const [[conversation]] = await Conversation.findOneById(conversation_id);
  if (!conversation) return res.status(404).send({ message: "La conversation n'existe pas" });
  req.newMessage = { message, conversation_id };
  return next();
};

module.exports = { validatePostMessage, validatePutMessage };
