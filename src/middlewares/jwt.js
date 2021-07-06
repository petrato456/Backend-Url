const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../services/logger');

const jwtVerify = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token JWT não foi enviado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res
      .status(401)
      .json({ error: 'Valor enviado não está com 2 partes' });
  }

  const [scheme, token] = parts;

  if (!scheme === 'Bearer') {
    return res.status(401).json({ error: 'Primeira parte inválida' });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    req.userId = tokenDecoded.id;

    return next();
  } catch (e) {
    logger.error(e);
    return res.status(401).json({ error: 'Token JWT inválido' });
  }
};

module.exports = jwtVerify;
