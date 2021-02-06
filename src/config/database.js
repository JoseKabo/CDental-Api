const mysql = require('mysql');

const getConnection = () => mysql.createConnection({
    host: 'sql138.main-hosting.eu',
    user: 'u224428987_cdental_su',
    password: '7x=H~gAm^G',
    database: 'u224428987_cdental'
});

module.exports = getConnection;