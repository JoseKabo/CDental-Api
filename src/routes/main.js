const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');
const dentista_stadistics = require('../routes/app/cd.dentista/home.stadistics');
const services = require('../routes/app/cd.dentista/services');
const subServices = require('../routes/app/cd.dentista/sub.services');

app.use('/dentista', dentista);
app.use('/dentista', dentista_stadistics);
app.use('/dentista', services);
app.use('/dentista', subServices);


module.exports = app;