const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');
const dentista_stadistics = require('../routes/app/cd.dentista/home.stadistics');

app.use('/dentista', dentista);
app.use('/dentista', dentista_stadistics);


module.exports = app;