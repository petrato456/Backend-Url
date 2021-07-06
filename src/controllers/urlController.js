// TODO: REFATORAR
const urlModel = require("../models/urlModel");
const logger = require("../services/logger");

class UrlController {

  async store(req, res) {
    logger.info("Criando nova URL");
    const urlToSave = req.body;
    const query = { url: urlToSave.url };
    // verifica se a url atual já existe no banco de dados
    const thisUrl = await urlModel.findOne(query);

    if(thisUrl){
        logger.info("Url já existe");
      return res.status(400).json({ error: "Url já existe na base de dados" });
    }
    const url = await urlModel.create(urlToSave);
    logger.info(`Url salva com sucesso: ${url}, ${url.urlHash}, ${url.userId}`);
    return res.status(201).json({ url });
  }

  async delete(req, res) {
    const { id } = req.params;

    logger.info(`Deletando urlId: ${id}`);

    const url = await urlModel.findById(id);

    if (!url) {
      logger.info("Url não existe");
      return res.status(400).json({ error: "Url não existe na base de dados" });
    }

    await urlModel.findByIdAndDelete(id);

    logger.info("Url deletada com sucesso!");
    return res.json({ msg: "Url foi deletada com sucesso!" });
  }

  async update(req, res) {
    const { id } = req.params;

    logger.info(`Editando url ${id}`);

    const url = await urlModel.findById(id);

    if (!url) {
      logger.info("Url não existe");
      return res.status(400).json({ error: "Url não existe na base de dados" });
    }

    delete req.body.password;

    logger.info(`Nova URL: ${req.body}`);

    const newUrl = await urlModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    logger.info(`Url atualizada com sucesso! ${newUrl}`);

    return res.json({ newUrlr });
  }

  async show(req, res) {
    const { id } = req.params;

    logger.info(`Busca pela url: ${id}`);

    const url = await urlModel.findById(id);
    return res.json({ url });
  }

  async index(req, res) {
    const data = await urlModel.find();
    return res.json({ urls:data });
  }
// TODO: [] Esta function deve ser reavaliada []
  async uncode(req,res){

      const code = req.params.code;
      const query = { urlHash: code };
      const result = await urlModel.findOne(query);
      console.log(result);
      if (!result) return res.sendStatus(404);

      // resultado.hits++;
      // await resultado.save();

      //res.redirect(resultado.url);
      console.log(result.url)
      return res.json(result.url);

  }
}

module.exports = new UrlController();
