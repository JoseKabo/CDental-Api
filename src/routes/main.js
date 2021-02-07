const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');
const dentista_stadistics = require('../routes/app/cd.dentista/home.stadistics');
const dentista_carnets = require('./app/cd.dentista/carnets');

app.use('/dentista', dentista);
app.use('/dentista', dentista_stadistics);
app.use('/dentista', dentista_carnets);


module.exports = app;