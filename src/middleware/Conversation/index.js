const validatePostConversation = (req, res, next) => {
  const { receiver_id, sender_id } = req.body;
  if (!receiver_id && !sender_id) return res.status(422).send({ message: "La conversation n'a pas pû être crée" });
  req.newConversation = { receiver_id, sender_id };
  return next();
};

module.exports = { validatePostConversation };
