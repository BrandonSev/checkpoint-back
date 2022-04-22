const bcrypt = require("bcrypt");
const { User } = require("../../models");

const validatePostBusiness = async (req, res, next) => {
  const { email, password, localisation, name, siret } = req.body;
  if (!email && !password && !localisation && !name && !siret && !req.files[0].length)
    return res.status(422).send({ message: "Tout les champs nécessaire sont requis" });
  const [[userEmail]] = await User.findOneByEmail(email);
  if (userEmail) return res.status(422).send({ message: "L'email est déjà utilisé" });
  req.newBusiness = {
    email,
    password: await bcrypt.hash(password, 10),
    localisation,
    name,
    siret,
    avatar: req.files[0].filename,
  };
  return next();
};

const validatePutBusiness = async (req, res, next) => {
  const { email, password, localisation, name, siret } = req.body;

  if (!email && !password && !localisation && !name) return res.status(422).send({ message: "Saisissez au moins un champ valide à la modification" });
  req.newBusiness = {};
  if (password) {
    req.newBusiness = { ...req.newBusiness, password: await bcrypt.hash(password, 10) };
  }
  if (localisation) {
    req.nenewBusinesswUser = { ...req.newBusiness, localisation };
  }
  if (name) {
    req.newBusiness = { ...req.newBusiness, name };
  }
  if (siret) {
    req.newBusiness = { ...req.newUsnewBusinesser, siret };
  }
  return next();
};

module.exports = { validatePostBusiness, validatePutBusiness };
