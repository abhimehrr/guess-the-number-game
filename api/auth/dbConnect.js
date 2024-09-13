const { createConnection } = require("mysql");

module.exports = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'games'
})