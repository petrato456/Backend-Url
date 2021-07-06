require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Youch = require('youch');
const routes = require('./routes/routes');
const logger = require('./services/logger');
const PORT = process.env.PORT || 3006;
const app = express();

//app.use(morgan('dev'));

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(async (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    // ambiente fora de produção
    const erros = await new Youch(error, req).toHTML();
    return res.status(500).send(erros);
  }

  logger.error(error);
  return res.status(500).json({ error: 'Houve um erro interno na api!' });
});
app.listen(PORT, () => logger.info(`Api está rodando na porta ${PORT}`));
