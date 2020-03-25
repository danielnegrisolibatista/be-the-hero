const express = require('express');

const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.get('/', function(req, res) {
    res.send('hello world from routes.js');
});

router.post('/sessions', SessionController.create);

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);

router.get('/profile', ProfileController.index);

router.get('/incidents', IncidentController.index);
router.post('/incidents', IncidentController.create);
router.delete('/incidents/:id', IncidentController.delete);

module.exports = router;