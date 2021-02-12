const express = require('express');
const getConnection = require('../../../../config/database');

const router = express.Router();

//#region Pagos CRUD
// insert paciente
router.post('/addcustomer', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_clinica, Nombre, Direccion, Telefono, Radica, Email, Edad,
        Alergias, Cirugias, Enfermedades, Total, id_subservicio
    } = request.body;
    const sql = ` CALL SP_PACIENTES_ADD(?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, @res) `;
    const values = [id_clinica, Nombre, Direccion, Telefono, Radica, Email, Edad,
                    Alergias, Cirugias, Enfermedades, Total, id_subservicio];
    connection.query(sql, values, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        if (result.length > 0) {
            response.status(200).json({ error: false, status: 200, message: result[0] });
        } else {
            response.status(200).json({ error: true, status: 500, message: 'No result' });
        }
    });
    connection.end();
});

// Update pago
router.post('/updatecustomer', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_paciente, id_historial, id_clinica, Nombre, Direccion, Telefono, Radica, Email, Edad,
        Alergias, Cirugias, Enfermedades
    } = request.body;
    const sql = ` CALL SP_PACIENTES_UPDATE(?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, @res) `;
    const values = [ id_paciente, id_historial, id_clinica, Nombre, Direccion, Telefono, Radica, Email, Edad,
                    Alergias, Cirugias, Enfermedades];
    connection.query(sql, values, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        if (result.length > 0) {
            response.status(200).json({ error: false, status: 200, message: result[0] });
        } else {
            response.status(200).json({ error: true, status: 500, message: 'No result' });
        }
    });
    connection.end();
});
// DELETE paciente
router.post('/deletecustomer', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_clinica, id_paciente, id_info
    } = request.body;
    const sql = ` CALL SP_PACIENTES_DELETE(?, ?, ?, @p5); `;
    const values = [id_clinica, id_paciente, id_info];
    connection.query(sql, values, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        if (result.length > 0) {
            response.status(200).json({ error: false, status: 200, message: result[0] });
        } else {
            response.status(200).json({ error: true, status: 500, message: 'No result' });
        }
    });
    connection.end();
});
//#endregion

module.exports = router;