const validatePostLikes = async (req, res, next) => {
  const { users_id, business_id, type } = req.body;
  if (!users_id && !business_id && !type) return res.status(422).send({ message: "Tout les champs nécessaire sont requis" });
  req.newLike = {
    users_id,
    business_id,
    type,
  };
  return next();
};

const validatePutLike = async (req, res, next) => {
  const { users_id, business_id, type } = req.body;

  if (!users_id && !business_id && !type) return res.status(422).send({ message: "Saisissez au moins un champ valide à la modification" });
  req.newLike = {};
  if (users_id) {
    req.newLike = { ...req.newLike, users_id };
  }
  if (business_id) {
    req.newLike = { ...req.newLike, business_id };
  }
  if (type) {
    req.newLike = { ...req.newLike, type };
  }
  return next();
};

module.exports = { validatePostLikes, validatePutLike };
