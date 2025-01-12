const { createPool } = require("mysql");
require("dotenv").config();

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    connectionlimit: 10
});

module.exports = pool;