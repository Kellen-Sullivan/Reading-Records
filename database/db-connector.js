// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'test'
})

// Export it for use in our applicaiton
module.exports.pool = pool;