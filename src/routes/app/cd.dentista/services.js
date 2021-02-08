const router = require('express').Router();
const getConnection = require('../../../config/database');


router.post('/all-services-by-clinic', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `SELECT id_servicio, Nombre FROM servicios WHERE id_clinica = ?`;
    const {id_clinica} = request.body;
    connection.query(sql, id_clinica, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: result });
    });
    connection.end();
});

router.post('/add-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `INSERT INTO servicios (Nombre, id_clinica) VALUES (?, ?)`;
    const {Nombre, id_clinica} = request.body;
    connection.query(sql, [Nombre, id_clinica], (error, _) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Se registro correctamente el servicio' });
    });
    connection.end();
});

router.delete('/delete-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `DELETE FROM servicios
                    WHERE 
                        id_servicio = ?`;
    const {id_servicio} = request.body;
    connection.query(sql, id_servicio, (error, _) => {
        if (error) response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        response.status(200).json({ error: false, status: 200, message: 'Se elimino correctamente' });
    });
    connection.end();
});

module.exports = router;