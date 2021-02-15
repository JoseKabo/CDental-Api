const express = require('express');
const ejs = require('ejs');
const transporter = require('../../../../config/mail');
const createMailOptions = require('../../../../functions/mail.functions');
const hbs = require('nodemailer-express-handlebars');
const router = express.Router();

router.post('/confirmationservice', (request, response) => {
   
   const { Paciente, Email, Clinica, Servicio } = request.body;
   const subject = 'Bienvenido a ' + Clinica;
   const mailData = {
       Paciente: Paciente,
       Clinica: Clinica,
       Servicio: Servicio
    };
    ejs.renderFile(__dirname + "/views/dentista.confirmation.ejs", mailData, function (error, data) {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        else {
            const contentHTML = data;
            mailOptions = createMailOptions(Email, subject, contentHTML);
            transporter.use('compile', hbs({
                viewEngine: 'express-handlebars',
                viewPath: './views/'
            }))
            transporter.sendMail(mailOptions, (error, _) => {
                if (error) {
                    response.status(200).json({ error: true, status: 500, message: error.message });
                }
                else {
                    response.status(200).json({ error: false, status: 200, message: 'Notificación  enviada' });
                }
            });
        }
    });
});
router.post('/cotizacion', (request, response) => {
   
    const { Dentista, Clinica, Servicio, SubServicio, Costo, Descripcion, FechaCotizacion, Total, Comentarios, Email } = request.body;
    const subject = 'Cotización de ' + SubServicio;
    const mailData = {
        Dentista: Dentista,
        Clinica: Clinica,
        Servicio: Servicio,
        SubServicio: SubServicio,
        Costo: Costo,
        Descripcion: Descripcion,
        FechaCotizacion: FechaCotizacion,
        Total: Total,
        Comentarios: Comentarios,
        Email: Email
     };
     ejs.renderFile(__dirname + "/views/dentista.cotizacion.ejs", mailData, function (error, data) {
         if (error) response.status(200).json({ error: true, status: 500, message: error.message });
         else {
             const contentHTML = data;
             mailOptions = createMailOptions(Email, subject, contentHTML);
             transporter.sendMail(mailOptions, (error, _) => {
                 if (error) {
                     response.status(200).json({ error: true, status: 500, message: error.message });
                 }
                 else {
                     response.status(200).json({ error: false, status: 200, message: 'Cotización  enviada' });
                 }
             });
         }
     });
 });
module.exports = router;