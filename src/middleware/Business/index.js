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

  if (!email && !password && !localisation && !name && !req.files[0].length)
    return res.status(422).send({ message: "Saisissez au moins un champ valide à la modification" });
  req.newUser = {};
  if (password) {
    req.newUser = { ...req.newUser, password: await bcrypt.hash(password, 10) };
  }
  if (localisation) {
    req.newUser = { ...req.newUser, localisation };
  }
  if (name) {
    req.newUser = { ...req.newUser, name };
  }
  if (siret) {
    req.newUser = { ...req.newUser, siret };
  }
  return next();
};

module.exports = { validatePostBusiness, validatePutBusiness };
