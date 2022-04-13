const bcrypt = require("bcrypt");
const { Business } = require("../../models");

const validatePostUser = async (req, res, next) => {
  const { firstname, lastname, age, email, password, school_level, localisation, github_url, linkedin_url, why_me } = req.body;
  if (
    !firstname &&
    !lastname &&
    !age &&
    !email &&
    !password &&
    !school_level &&
    !localisation &&
    !github_url &&
    !linkedin_url &&
    !why_me &&
    !req.files[0].length
  )
    return res.status(422).send({ message: "Tout les champs nécessaire sont requis" });
  const [[businessEmail]] = await Business.findOneByEmail(email);
  if (businessEmail) return res.status(422).send({ message: "L'email est déjà utilisé" });
  req.newUser = {
    firstname,
    lastname,
    age,
    email,
    password: await bcrypt.hash(password, 10),
    school_level,
    localisation,
    github_url,
    linkedin_url,
    why_me,
    avatar: req.files[0].filename,
  };
  return next();
};

const validatePutUser = async (req, res, next) => {
  const { firstname, lastname, age, email, password, school_level, localisation, github_url, linkedin_url, why_me, resume_project } = req.body;
  if (
    !firstname &&
    !lastname &&
    !age &&
    !email &&
    !password &&
    !school_level &&
    !localisation &&
    !github_url &&
    !linkedin_url &&
    !why_me &&
    !resume_project &&
    !req.files[0].length
  )
    return res.status(422).send({ message: "Saisissez au moins un champ valide à la modification" });
  req.newUser = {};
  if (firstname) {
    req.newUser = { ...req.newUser, firstname };
  }
  if (lastname) {
    req.newUser = { ...req.newUser, lastname };
  }
  if (age) {
    req.newUser = { ...req.newUser, age };
  }
  if (password) {
    req.newUser = { ...req.newUser, password: await bcrypt.hash(password, 10) };
  }
  if (school_level) {
    req.newUser = { ...req.newUser, school_level };
  }
  if (localisation) {
    req.newUser = { ...req.newUser, localisation };
  }
  if (github_url) {
    req.newUser = { ...req.newUser, github_url };
  }
  if (linkedin_url) {
    req.newUser = { ...req.newUser, linkedin_url };
  }
  if (why_me) {
    req.newUser = { ...req.newUser, why_me };
  }
  if (resume_project) {
    req.newUser = { ...req.newUser, resume_project };
  }
  if (req.files[0].length) {
    req.newUser = { ...req.newUser, avatar: req.files[0].filename };
  }
  return next();
};

module.exports = { validatePostUser, validatePutUser };
