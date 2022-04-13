const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Business } = require("../models");

const maxAge = 3 * 24 * 60 * 60 * 1000;
// Function qui permet de génerer un token jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send();
  try {
    const [[user]] = await User.findOneByEmail(email);
    const [[business]] = await Business.findOneByEmail(email);

    if (!user && !business) return res.status(404).send({ message: "Email introuvable" });
    if (business) {
      const comparison = await bcrypt.compare(password, business.password);
      const token = createToken(business.id);
      if (comparison) {
        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: true, maxAge });
        return res.status(200).json({
          message: "Connexion réussi",
          token,
        });
      }
      return res.status(400).json({ message: "Mot de passe incorrect, veuillez réessayer" });
    }
    if (user) {
      const comparison = await bcrypt.compare(password, user.password);
      const token = createToken(user.id);
      if (comparison) {
        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: true, maxAge });
        return res.status(200).json({
          message: "Connexion réussi",
          token,
        });
      }
      return res.status(400).json({ message: "Mot de passe incorrect, veuillez réessayer" });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports.signOut = (req, res) => {
  if (req.cookies.jwt) {
    return res.clearCookie("jwt").status(200).json({ message: "Vous êtes maintenant déconnecté" });
  }
  return res.status(400).json({ message: "Vous n'êtes actuellement pas connecté" });
};
