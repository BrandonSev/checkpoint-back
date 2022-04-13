const { Asset } = require("../models");

const findMany = async (req, res) => {
  try {
    const [results] = await Asset.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await Asset.findOneById(id);
    if (!results) return res.status(404).send("Le fichier est introuvable");
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const [result] = await Asset.createOne(req.newAsset);
    const [[newAsset]] = await Asset.findOneById(result.insertId);
    return res.status(201).json({
      message: "Le fichier à bien été ajouté",
      asset: newAsset,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await Asset.updateOneById(req.newAsset, id);
    const [[asset]] = await Asset.findOneById(id);
    return res.status(200).json({ message: "Le fichier à bien été mise à jour", asset });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const [result] = await Asset.deleteOneById(req.params.id);
    if (result.affectedRows <= 0) {
      return res.status(404).send("Le fichier est introuvable");
    }
    return res.status(204).json("Le fichier à bien été supprimé");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, deleteOneById };
