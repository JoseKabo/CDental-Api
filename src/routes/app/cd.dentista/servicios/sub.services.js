const router = require('express').Router();
const getConnection = require('../../../../config/database');

router.post('/all-sub-services-by-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `SELECT id_SubServicio, SubServicio, descripcion, precio FROM SubServicios WHERE id_servicios = ?`;
    const { id_servicios } = request.body;
    connection.query(sql, id_servicios, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: result });
    });
    connection.end();
});

router.post('/all-services-subservices-clinic', (request, response) => {
    connection = getConnection();
    servicios = Array();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    let sql = `SELECT id_servicio, Nombre FROM servicios WHERE id_clinica = ?`;
    const { id_clinica } = request.body;
    connection.query(sql, id_clinica, async (error, result) => {
        console.log(result);
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        sql = `SELECT id_SubServicio, SubServicio, precio, descripcion FROM SubServicios WHERE id_servicios = ?`;
        for (const item of result) {
            await new Promise((resolve) => {
                connection.query(sql, item.id_servicio, (error, result) => {
                    if (error) response.status(200).json({ error: true, status: 500, message: error.message });
                    resolve(result);
                });
            }).then((list) => {
                servicios.push({
                    Nombre: item.Nombre,
                    id_servicio: item.id_servicio,
                    subServicios: list
                });
            });
        }
        connection.end();
        response.status(200).json({ error: false, status: 200, message: servicios });
    });
});


router.put('/update-sub-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `UPDATE SubServicios 
                    SET 
                        id_servicios = ?,
                        SubServicio = ?,
                        descripcion = ?, 
                        precio = ? 
                    WHERE 
                        id_SubServicio = ?`;
    const { id_servicios, SubServicio, descripcion, precio, id_SubServicio } = request.body;
    values = [
        id_servicios,
        SubServicio,
        descripcion,
        precio,
        id_SubServicio
    ];
    connection.query(sql, values, (error, _) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Se actualizo correctamente' });
    });
    connection.end();
});

router.post('/delete-sub-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `DELETE FROM SubServicios
                    WHERE 
                        id_SubServicio = ?`;
    const { id_SubServicio } = request.body;
    connection.query(sql, id_SubServicio, (error, _) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Se elimino correctamente' });
    });
    connection.end();
});

router.post('/add-sub-service', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const sql = `INSERT INTO SubServicios 
                    (SubServicio, descripcion, precio, id_servicios) 
                values 
                    (?, ?, ?, ?)`;
    const { SubServicio, descripcion, precio, id_servicios } = request.body;
    values = [
        SubServicio,
        descripcion,
        precio,
        id_servicios
    ];
    connection.query(sql, values, (error, _) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: 'Se registro correctamente el sub servicio' });
    });
    connection.end();
});

module.exports = router;