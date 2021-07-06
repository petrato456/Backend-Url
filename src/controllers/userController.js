const userModel = require('../models/userModel');
const logger = require('../services/logger');

class UserController {
  async store(req, res) {
    logger.info('Criando novo usuário');
    const userToSave = req.body;

    const user = await userModel.create(userToSave);

    logger.info(
      `Usuário salvo com sucesso: ${user.email}, ${user.name}, ${user._id}`
    );

    return res.status(201).json({ user });
  }

  async delete(req, res) {
    const { id } = req.params;

    logger.info(`Deletando userId: ${id}`);

    const user = await userModel.findById(id);

    if (!user) {
      logger.info('Usuário não existe');
      return res
        .status(400)
        .json({ error: 'Usuário não existe na base de dados' });
    }

    await userModel.findByIdAndDelete(id);

    logger.info('Usuário deletado com sucesso!');
    return res.json({ msg: 'Usuário foi deletado com sucesso!' });
  }

  async update(req, res) {
    const { id } = req.params;

    logger.info(`Editando usuário ${id}`);

    const user = await userModel.findById(id);

    if (!user) {
      logger.info('Usuário não existe');
      return res
        .status(400)
        .json({ error: 'Usuário não existe na base de dados' });
    }

    delete req.body.password;

    logger.info(`Novos dados do usuário: ${req.body}`);

    const newUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    logger.info(`Usuário atualizado com sucesso! ${newUser}`);

    return res.json({ newUser });
  }

  async show(req, res) {
    const { id } = req.params;

    logger.info(`Busca pelo usuário: ${id}`);

    const user = await userModel.findById(id);
    return res.json({ user });
  }

  async index(req, res) {
    const users = await userModel.find();
    return res.json({ users });
  }
}

module.exports = new UserController();
