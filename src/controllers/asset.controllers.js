const multer = require("multer");
const fs = require("fs");
const { Asset } = require("../models");

const findMany = async (req, res) => {
  try {
    const [result] = await Asset.findMany();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await Asset.findOneById(id);
    if (!result) return res.status(404).send();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createOne = async (req, res) => {
  try {
    const { owner_id } = req.body;
    const arr = req.files.map(async (file) => {
      const [newAsset] = await Asset.createOne({
        filename: file.filename,
        owner_id,
      });
      const [[asset]] = await Asset.findOneById(newAsset.insertId);
      return asset;
    });
    const result = await Promise.all(arr);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    await Asset.updateOneById(req.newAsset, id);
    const [[newAsset]] = await Asset.findOneById(id);
    return res.status(200).send(newAsset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const removeOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Asset.findOneById(id);
    if (!result.length) return res.status(404).send();
    await Asset.removeOneById(id);
    fs.unlink(`assets/${result[0].filename}`, (err) => {
      if (err) return res.status(500).send(err);
      return true;
    });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const uploadAssets = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, "assets");
    },
    filename: (_, file, cb) => {
      cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage }).array("assets", 10);

  return upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message);
    }
    if (err) {
      return res.status(500).send(err.message);
    }
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return next();
  });
};

const uploadCv = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, "assets");
    },
    filename: (_, file, cb) => {
      cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage }).array("file", 10);

  return upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message);
    }
    if (err) {
      return res.status(500).send(err.message);
    }
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return next();
  });
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById, uploadAssets, uploadCv };
