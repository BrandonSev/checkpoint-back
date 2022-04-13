const { AuthController, UserController } = require("../controllers");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.signIn);
authRouter.post("/register", UserController.createOne);
authRouter.post("/logout", AuthController.signOut);

module.exports = authRouter;
