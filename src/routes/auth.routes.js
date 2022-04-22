const authRouter = require("express").Router();
const { AuthController, UserController } = require("../controllers");

authRouter.post("/login", AuthController.signIn);
authRouter.post("/register", UserController.createOne);
authRouter.post("/logout", AuthController.signOut);

module.exports = authRouter;
