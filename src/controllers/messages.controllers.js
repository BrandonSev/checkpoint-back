const { Message } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await Message.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findMessagesByConversationId = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Message.findMessagesByConversationId(id);
    if (!results.length) return res.status(404).send("Aucun message");
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await Message.createOne(req.newMessage);
    const [[newMessage]] = await Message.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre message à bien été créé",
      ...newMessage,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.updateOneById(req.newMessage, id);
    const [[message]] = await Message.findOneById(id);
    return res.status(200).json({ message: "Le message à bien été mis à jour", ...message });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [[result]] = await Message.findOneById(req.params.id);
    if (!result) {
      return res.status(404).send("La conversation est introuvable");
    }
    return res.status(204).json("La conversation à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findMessagesByConversationId, updateOneById, createOne, deleteOneById };
