const { Conversation, Message } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await Conversation.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findConversationsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const [conversations] = await Conversation.findConversationsByUserId(id);
    const conversationsMessages = await Promise.all(
      await conversations.map(async (c) => {
        const [messages] = await Message.findMessagesByConversationId(c.id);
        return { ...c, messages };
      }),
    );
    return res.json(conversationsMessages);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await Conversation.findOneById(id);
    if (!results) return res.status(404).send("La conversation n'existe pas");
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await Conversation.createOne(req.newConversation);
    const [[newConversation]] = await Conversation.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre conversation à bien été créer",
      conversation: newConversation,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [[result]] = await Conversation.findOneById(req.params.id);
    if (!result) {
      return res.status(404).send("La conversation est introuvable");
    }
    return res.status(204).json("La conversation à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, deleteOneById, findConversationsByUserId };
