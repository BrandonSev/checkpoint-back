const { Like } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await Like.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await Like.findOneById(id);
    if (!results) return res.status(404).send();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await Like.createOne(req.newLike);
    const [[like]] = await Like.findOneById(result.insertId);
    return res.status(201).json({
      like: like,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await Like.updateOneById(req.newLike, id);
    const [[like]] = await Like.findOneById(id);
    return res.status(200).json({ message: "Le like à bien été mise à jour", like });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [result] = await Like.deleteOneById(req.params.id);
    if (result.affectedRows <= 0) {
      return res.status(404).send();
    }
    return res.status(204).json("Le like à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, deleteOneById };
