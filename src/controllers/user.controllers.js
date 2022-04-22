const { User, Like } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await User.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await User.findOneById(id);
    if (!results) return res.status(404).send("L'utilisateur est introuvable");
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await User.createOne(req.newUser);
    const [[newUser]] = await User.findOneById(result.insertId);
    return res.status(201).json({
      message: "L'utilisateur à bien été créer",
      adoption_place: newUser,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneByIdWithlikes = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Like.findAllByUserId(id);
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.updateOneById(req.newUser, id);
    const [[user]] = await User.findOneById(id);
    return res.status(200).json({ message: "Le compte à bien été mise à jour", user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [result] = await User.deleteOneById(req.params.id);
    if (result.affectedRows <= 0) {
      return res.status(404).send("L'utilisateur est introuvable");
    }
    return res.status(204).json("Le compte à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, deleteOneById, findOneByIdWithlikes };
