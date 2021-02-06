const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');

app.use('/dentista', dentista);


module.exports = app;