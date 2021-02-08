const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');
const dentista_stadistics = require('../routes/app/cd.dentista/home.stadistics');

  
const services = require('../routes/app/cd.dentista/services');
const subServices = require('../routes/app/cd.dentista/sub.services');

const dentista_carnets = require('./app/cd.dentista/carnets');
const dentista_carnetsdetails = require('./app/cd.dentista/carnets.viewcarnet');
const dentista_citescrud = require('./app/cd.dentista/carnets.crudcites');

const dentista_agenda = require('./app/cd.dentista/home.agenda');

app.use('/dentista', services);
app.use('/dentista', subServices);
app.use('/dentista', dentista);
app.use('/dentista', dentista_stadistics);
app.use('/dentista', dentista_carnets);
app.use('/dentista/carnets', dentista_carnetsdetails);
app.use('/dentista/carnet/cites', dentista_citescrud);
app.use('/dentista/agenda', dentista_agenda);



module.exports = app;