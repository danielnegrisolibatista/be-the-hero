const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.get('/', function(req, res) {
    res.send('hello world from routes.js');
});

router.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create);

router.get('/ongs', OngController.index);

router.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(8).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

router.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}), ProfileController.index);

router.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index);

router.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), IncidentController.create);

router.delete('/incidents/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);

module.exports = router;