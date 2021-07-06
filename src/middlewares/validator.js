const yup = require("yup");

class Validators {
  async storeUserValidator(req, res, next) {
    const userValidation = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    const validateUser = await userValidation.isValid(req.body);

    if (!validateUser) {
      return res.status(400).json({ error: "Dados enviados incorretamente" });
    }

    return next();
  }

  async updateUserValidator(req, res, next) {
    const userValidation = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    const validateUser = await userValidation.isValid(req.body);

    if (!validateUser) {
      return res.status(400).json({ error: "Dados enviados incorretamente" });
    }

    return next();
  }

  async storeUrlValidator(req,res,next){
    const urlValidation = yup.object().shape({
      url: yup.string().required(),

    });

    const validateUrl = await urlrValidation.isValid(req.body);

    if (!validateUrl) {
      return res.status(400).json({ error: "Dados enviados incorretamente" });
    }

    return next();
  }

  async updateUrlValidator(req,res,next){
    const userValidation = yup.object().shape({

      url: yup.string().url().required(),
    });

    const validateUrl = await urlValidation.isValid(req.body);

    if (!validateUrl) {
      return res.status(400).json({ error: "Dados enviados incorretamente" });
    }

    return next();
  }
}

module.exports = new Validators();
