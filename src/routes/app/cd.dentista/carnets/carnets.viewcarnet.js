const express = require('express');
const getConnection = require('../../../../config/database');

const router = express.Router();

router.post('/carnetdetails', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_clinica, id_paciente, id_subservicio, id_servicioclientes
    } = request.body;
    const sql = ` CALL SP_CARNETDETAILS(?, ?, ?, ?) `;
    const values = [id_clinica, id_paciente, id_subservicio, id_servicioclientes];
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

module.exports = router;