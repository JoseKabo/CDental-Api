const express = require('express');
const getConnection = require('../../../../config/database');

const router = express.Router();

router.post('/select-cites', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {id_pacientes} = request.body;
    const sql = `SELECT
                    Citas.id_cita,
                    Citas.Fecha_cita,
                    Citas.Hora_cita,
                    Citas.Asitencia_cita,
                    Citas.Evaluaciones,
                    Citas.id_paciente,
                    Pacientes.Nombre_Completo
                FROM
                    Citas
                INNER JOIN Pacientes ON Citas.id_paciente = Pacientes.id_pacientes
                WHERE
                    Pacientes.id_pacientes = ?;`;
    connection.query(sql, id_pacientes, (error, result) => {
        if (error) response.status(200).json({ error: true, status: 500, message: error.message });
        response.status(200).json({ error: false, status: 200, message: result });
    });
    connection.end();
});

//#region Citas CRUD
// cargar citas
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
// insertar citas
router.post('/addcites', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        Fecha_cita, Hora_cita, Asistencia_cita, Evaluaciones, Fecha_pago, Cantidad, Concepto, id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_ADDCITE(?, ?, ?, ?, ?, ?, ?, ?, @p5) `;
    const values = [Fecha_cita, Hora_cita, Asistencia_cita, Evaluaciones, Fecha_pago, Cantidad, Concepto, id_paciente];
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
// update cita
router.post('/updatecite', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_cita, Fecha_cita, Hora_cita, Asistencia_cita, Evaluaciones, id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_UPDATECITE(?, ?, ?, ?, ?, ?, @p5); `;
    const values = [id_cita, Fecha_cita, Hora_cita, Asistencia_cita, Evaluaciones, id_paciente];
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
// delete cita
router.post('/deletecite', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_cita, id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_DELETECITE(?, ?, @p5); `;
    const values = [id_cita, id_paciente];
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
router.post('/updatepayment', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_cita, Fecha_pago, Cantidad, Concepto, id_paciente, id_pago
    } = request.body;
    const sql = ` CALL SP_CARNETS_UPDATEPAYMENT(?, ?, ?, ?, ?, ?, @p5); `;
    const values = [id_cita, Fecha_pago, Cantidad, Concepto, id_paciente, id_pago];
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
// DELETE PAGO
router.post('/deletepayment', (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "ERROR_SERVER" });
        }
    });
    const {
        id_pago, id_paciente
    } = request.body;
    const sql = ` CALL SP_CARNETS_DELETEPAYMENT(?, ?, @p5); `;
    const values = [id_pago, id_paciente];
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