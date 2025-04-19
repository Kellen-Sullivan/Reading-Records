// Database
var db = require('./database/db-connector')

// express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

// handlebars
const { engine } = require('express-handlebars')
var exphbs = require('express-handlebars')
app.engine('.hbs', engine({extname: ".hbs"}))
app.set('view engine', '.hbs')

// ----------------------------------------------------------------------------- ROUTES ----------------------------------------------------------------------------------------

app.get('/', function(req, res)
{
    let query1 = 'SELECT * FROM books LIMIT 10;'
    db.pool.query(query1, function(error, rows, fields){
        res.render('index', {data: rows})
    })
})                                      

app.post('/add-book-ajax', function(req, res)
{
    let data = req.body
    // deal with null values here if necessary later

    let query1 = `INSERT INTO Books (title, author, words) VALUES ('${data.title}', '${data.author}', ${data.words});`
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            let query2 = `SELECT * FROM Books;`
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-book-ajax/', function(req,res,next){

    let data = req.body
    let bookID = parseInt(data.id)
    let deleteBook = `DELETE FROM Books WHERE bookID = ?` 
  
    // Run the delete query
    db.pool.query(deleteBook, [bookID], function(error, rows, fields){
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400)
        }
        else {
            res.sendStatus(204)
        }
    })
});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});