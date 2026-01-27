const mysql = require("mysql2/promise"); // IMPORTANTE: adicione o /promise

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456", // Verifique se sua senha está correta
    // Remova a linha 'database' por enquanto para podermos criar o banco via código
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;