const express = require('express');
const getConnection = require('../../../config/database');

const router = express.Router();

//#region Citas CRUD
router.post('/loadcites', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_LOADCITES(?) `;
    const values = [id_paciente];
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
//#region Pagos CRUD
// Cargar pagos
router.post('/loadpayments', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_LOADPAYMENTS(?) `;
    const values = [id_paciente];
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
// Insert pago
router.post('/addpayment', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_cita, Fecha_pago, Cantidad, Concepto, id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_ADDPAYMENT(?, ?, ?, ?, ?, @p5); `;
    const values = [id_cita, Fecha_pago, Cantidad, Concepto, id_paciente];
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
//#endregion

module.exports = router;