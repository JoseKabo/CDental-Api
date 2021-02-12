const express = require('express');
const app = express();

const dentista = require('../routes/app/cd.dentista/signin');
const dentista_stadistics = require('../routes/app/cd.dentista/home/home.stadistics');

  
const services = require('../routes/app/cd.dentista/servicios/services');
const subServices = require('./app/cd.dentista/servicios/sub.services');

const dentista_carnets = require('./app/cd.dentista/carnets/carnets');
const dentista_carnetsdetails = require('./app/cd.dentista/carnets/carnets.viewcarnet');
const dentista_citescrud = require('./app/cd.dentista/carnets/carnets.crudcites');

const dentista_agenda = require('./app/cd.dentista/home/home.agenda');

const dentista_pacientes = require('./app/cd.dentista/pacientes/loadPacientes');
const dentista_uploads = require('./app/cd.dentista/pacientes/uploadimages');
const dentista_customercrud = require('./app/cd.dentista/pacientes/crudPacientes');

app.use('/dentista', services);
app.use('/dentista', subServices);
app.use('/dentista', dentista);
app.use('/dentista', dentista_stadistics);
app.use('/dentista', dentista_carnets);
app.use('/dentista/carnets', dentista_carnetsdetails);
app.use('/dentista/carnet/cites', dentista_citescrud);
app.use('/dentista/agenda', dentista_agenda);
app.use('/dentista/pacientes', dentista_pacientes);
app.use('/dentista/uploads', dentista_uploads);
app.use('/dentista/customers', dentista_customercrud);



module.exports = app;