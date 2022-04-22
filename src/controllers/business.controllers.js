const fs = require("fs");
const { Business, Like } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await Business.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await Business.findOneById(id);
    if (!results) return res.status(404).send("La société est introuvable");
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneByIdWithLikes = async (req, res) => {
  try {
    const [results] = await Like.findAllByBusinessId(req.params.id);
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await Business.createOne(req.newBusiness);
    const [[newBusiness]] = await Business.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre compte à bien été créer",
      account: newBusiness,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await Business.updateOneById(req.newBusiness, id);
    const [[business]] = await Business.findOneById(id);
    return res.status(200).json({ message: "Le compte à bien été mise à jour", business });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [[result]] = await Business.findOneById(req.params.id);
    if (!result) {
      return res.status(404).send("La société est introuvable");
    }
    fs.unlink(`assets/${result.filename}`, (err) => {
      if (err) return res.status(500).send(err);
      return true;
    });
    return res.status(204).json("La société à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, deleteOneById, findOneByIdWithLikes };
