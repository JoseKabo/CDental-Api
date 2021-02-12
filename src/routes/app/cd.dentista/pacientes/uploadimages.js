const express = require('express');
const expressFileUpload = require('express-fileupload');
const Client = require('ftp');

const getConnection = require('../../../../config/database');
const ftpConfig = require('../../../../config/ftp_connect');

const router = express.Router();
router.use(expressFileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

router.post('/uploadradio', async (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "Internal server error" });
        }
    });
    const acceptedExtensions = ['jpg', 'jpeg', 'png'];
    let uploadRoute;
    const {
        id_expediente
    } = request.body;
    if (request.files) {
        const { radioimg } = request.files;
        const extensionFoto = radioimg.name.split('.')[1];
        if (acceptedExtensions.indexOf(extensionFoto) < 0) {
            const errorMsg = 'Verifica la extensión de la imagen, las extensiones válidas son: ' + acceptedExtensions.join(', ');
            return response.status(200).json({ error: true, status: 500, message: errorMsg });
        }
        uploadRoute = `/cdental_uploads/expedientes/radiografias/${id_expediente}_radio.${extensionFoto}`;

        var ftp = new Client();
        ftp.on('ready', function () {
            ftp.put(radioimg.tempFilePath, uploadRoute, function (err) {
                if (err) throw err;
                ftp.end();
            });
        });
        ftp.connect(ftpConfig);
    } else {
        uploadRoute = '';
    }
    const sql = `CALL SP_UPDATE_RADIO (?, ?, @result)`;
    const values = [
        id_expediente,
        uploadRoute
    ];
    connection.query(sql, values, (error, result) => {
        if (error) return response.status(200).json({ error: true, status: 500, message: error.message });
        console.log(result);
        return response.status(200).json({ error: false, status: 200, message: result[0] });
    });
    connection.end();
});

router.post('/uploadmolde', async (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "Internal server error" });
        }
    });
    const acceptedExtensions = ['jpg', 'jpeg', 'png'];
    let uploadRoute;
    const {
        id_expediente
    } = request.body;
    if (request.files) {
        const { moldeimg } = request.files;
        const extensionFoto = moldeimg.name.split('.')[1];
        if (acceptedExtensions.indexOf(extensionFoto) < 0) {
            const errorMsg = 'Verifica la extensión de la imagen, las extensiones válidas son: ' + acceptedExtensions.join(', ');
            return response.status(200).json({ error: true, status: 500, message: errorMsg });
        }
        uploadRoute = `/cdental_uploads/expedientes/moldes/${id_expediente}_molde.${extensionFoto}`;

        var ftp = new Client();
        ftp.on('ready', function () {
            ftp.put(moldeimg.tempFilePath, uploadRoute, function (err) {
                if (err) throw err;
                ftp.end();
            });
        });
        ftp.connect(ftpConfig);
    } else {
        uploadRoute = '';
    }
    const sql = `CALL SP_UPDATE_MOLDE(?, ?, @result)`;
    const values = [
        id_expediente,
        uploadRoute
    ];
    connection.query(sql, values, (error, result) => {
        if (error) return response.status(200).json({ error: true, status: 500, message: error.message });
        console.log(result);
        return response.status(200).json({ error: false, status: 200, message: result[0] });
    });
    connection.end();
});

router.post('/uploadotro', async (request, response) => {
    connection = getConnection();
    connection.connect(error => {
        if (error) {
            console.log(error);
            response.status(200).json({ error: true, status: 500, message: "Internal server error" });
        }
    });
    const acceptedExtensions = ['jpg', 'jpeg', 'png'];
    let uploadRoute;
    const {
        id_expediente
    } = request.body;
    if (request.files) {
        const { otroimg } = request.files; 
        const extensionFoto = otroimg.name.split('.')[1];
        if (acceptedExtensions.indexOf(extensionFoto) < 0) {
            const errorMsg = 'Verifica la extensión de la imagen, las extensiones válidas son: ' + acceptedExtensions.join(', ');
            return response.status(200).json({ error: true, status: 500, message: errorMsg });
        }
        uploadRoute = `/cdental_uploads/expedientes/otros/${id_expediente}_otros.${extensionFoto}`;

        var ftp = new Client();
        ftp.on('ready', function () {
            ftp.put(otroimg.tempFilePath, uploadRoute, function (err) {
                if (err) throw err;
                ftp.end();
            });
        });
        ftp.connect(ftpConfig);
    } else {
        uploadRoute = '';
    }
    const sql = `CALL SP_UPDATE_OTRO(?, ?, @result)`;
    const values = [
        id_expediente,
        uploadRoute
    ];
    connection.query(sql, values, (error, result) => {
        if (error) return response.status(200).json({ error: true, status: 500, message: error.message });
        console.log(result);
        return response.status(200).json({ error: false, status: 200, message: result[0] });
    });
    connection.end();
});

module.exports = router;