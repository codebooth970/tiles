var mysql = require('mysql2')
var config = {
    database: {
        host: "localhost",
        user: "root",
        password: "",
        database: "tile"
    }
}
config.pool = mysql.createPool(config.database)
config.conn = config.pool.promise()

module.exports = config