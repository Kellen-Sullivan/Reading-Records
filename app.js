// Database
var db = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

app.get('/', function(req, res)
    {
        // Define our queries
        query4 = 'SELECT * FROM books;'

        // SELECT *...
        db.pool.query(query4, function(err, results, fields){

            // Send the results to the browser
            res.send(JSON.stringify(results));
        })
    })                                      

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});