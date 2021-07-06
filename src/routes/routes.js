const routes = require("express").Router();
const userController = require("../controllers/userController");
const urlController = require("../controllers/urlController");
const authController = require("../controllers/authController");
const jwtMid = require("../middlewares/jwt");
const validatorMid = require("../middlewares/validator");

routes.get("/", (req, res) => res.json({ msg: "Tudo certo, API Ativa!!!" }));

/* ROTAS DE AUTENTICAÇÃO SEM JWT */
routes.post("/login", authController.login);
routes.post("/reset-token", authController.createResetToken);
routes.post("/reset-password", authController.resetPassword);

// routes.use(jwtMid); //descomentar após testes

/* (PRIVATE ROUTES) ROTAS DO USUÁRIO */
routes.get("/user", userController.index);
routes.post("/user", validatorMid.storeUserValidator, userController.store);
routes.get("/user/:id", userController.show);
routes.delete("/user/:id", userController.delete);
routes.put(
  "/user/:id",
  validatorMid.updateUserValidator,
  userController.update,
);

/**ROTAS DA URL CADASTRO */
routes.get("/url", urlController.index);
routes.post("/url", urlController.store);
routes.get("/url/:code", urlController.uncode);
routes.delete("/url/:id", urlController.delete);
routes.put("/url/:id", validatorMid.updateUrlValidator, urlController.update);

/* ROTAS DE AUTENTICAÇÃO COM JWT */
routes.post("/change", authController.changePassword);

module.exports = routes;
