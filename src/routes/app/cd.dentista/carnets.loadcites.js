const express = require('express');
const getConnection = require('../../../config/database');

const router = express.Router();

router.post('/stadistics', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        mes_estadisticas, anio_estadisticas, dia_estadisticas, id_clinica
    } = request.body;
    const sql = ` CALL SP_REPORTES_CLIENTES_MES(?, ?, ?, ?) `;
    const values = [mes_estadisticas, anio_estadisticas, dia_estadisticas, id_clinica];
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