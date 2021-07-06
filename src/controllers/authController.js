const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const logger = require('../services/logger');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('password');

    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    const correctLogin = await bcrypt.compare(password, user.password);

    if (!correctLogin) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id },'dahdshahsahdsah', {
      expiresIn: '30d',
    });

    return res.json({ token });
  }

  async changePassword(req, res) {
    const { email, password, newPassword } = req.body;

    const user = await userModel.findOne({ email }).select('password');

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para trocar a senha' });
    }

    const correctLogin = await bcrypt.compare(password, user.password);

    if (!correctLogin) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para trocar a senha' });
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, { password: hashPass });

    return res.status(201).json({ msg: 'Senha foi atualizada com sucesso!' });
  }

  async createResetToken(req, res) {

    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para resetar a senha!' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); // getters and setters
    const tokenExpires = String(now);
    const { _id: id } = user;
    await userModel.findByIdAndUpdate(id, { token, tokenExpires });
    return res.status(201).json({ msg: 'Token resetado com sucesso!!!!' });
  }

  async resetPassword(req, res) {
    
    const { email, token, newPassword } = req.body;

    const user = await userModel
      .findOne({ email })
      .select('tokenExpires password token');

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para resetar a senha!' });
    }

    const now = new Date();

    if (now > user.tokenExpires) {
      return res.status(401).json({ error: 'Token expirado!' });
    }

    if (token !== user.token) {
      return res.status(401).json({ error: 'Token errado!' });
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, {
      password: hashPass,
      token: '',
      tokenExpires: '',
    });

    return res.status(201).json({ msg: 'Senha resetada com sucesso!' });

  }
}

module.exports = new AuthController();
