const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'moab-server.ddns.me',
    port: 3306,
    user: 'moab',
    password: 'Guilherme@1998',
    database: 'controle_atendimento',
});

module.exports = conexao;