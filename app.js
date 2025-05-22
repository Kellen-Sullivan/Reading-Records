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

app.get('/', function(req, res) {
    let userID = 1; // default to user 1 for now

    let query1 = `
        SELECT b.bookID, b.title, b.authors, b.num_pages, ub.pages_read, ub.is_complete 
        FROM UserBooks ub
        JOIN Books b ON ub.bookID = b.bookID
        WHERE ub.userID = ? 
        LIMIT 10;
    `;

    if (req.query.searchInput === undefined) {
        query2 = `SELECT * FROM Books LIMIT 3;`
    }
    else {
        query2 = `SELECT * FROM Books WHERE title LIKE '%${req.query.searchInput}%' OR authors LIKE '%${req.query.searchInput}%';`
    }

    db.pool.query(query1, [userID], function(error, rows, fields) { // this gets userBooks
        if (error) {
            console.log(error);
            res.status(500).send("Database error");
            return;
        }

        // Add progressPercentage for each user book
        let books = rows.map(function(book) {
            let newBook = {
                bookID: book.bookID,
                title: book.title,
                authors: book.authors,
                num_pages: book.num_pages,
                pages_read: book.pages_read,
                is_complete: book.is_complete === 1 ? "complete" : "incomplete", // if 1, passes complete, if 0, passes incomplete
                progressPercentage: Math.round((book.pages_read / book.num_pages) * 100)
            };
            return newBook;
        });

        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.status(500).send("Database error");
                return;
            }
            res.render('index', { data: rows, books:books });
        });
    })
});                                     

app.post('/add-userBook-ajax', function(req, res)
{
    let data = req.body
    // deal with null values here if necessary later

    let query1 = `INSERT INTO UserBooks (userID, bookID) VALUES (${data.userID}, ${data.bookID});`
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on books
            let query2 = `SELECT * FROM UserBooks;`
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

app.delete('/delete-userBook-ajax/', function(req,res,next){

    let data = req.body
    let bookID = parseInt(data.id)
    let deleteBook = `DELETE FROM UserBooks WHERE bookID = ?` 
  
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