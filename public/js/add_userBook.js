function addUserBook(bookID) {
    let data = {
        userID: 1,
        bookID: bookID
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-userBook-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}



// // Get the objects we need to modify
// let addUserBookForm = document.getElementById('add-userBook-form-ajax');

// // Modify the objects we need
// addUserBookForm.addEventListener("submit", function (e) {
    
//     // Prevent the form from submitting
//     e.preventDefault();

//     // Get form fields we need to get data from
//     let inputUserID = document.getElementById("input-userID");
//     let inputBookID = document.getElementById("input-bookID");

//     // Get the values from the form fields
//     let userIDValue = inputUserID.value;
//     let bookIDValue = inputBookID.value;

//     // Put our data we want to send in a javascript object
//     let data = {
//         userID: userIDValue,
//         bookID: bookIDValue
//     }
    
//     // Setup our AJAX request
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "/add-userBook-ajax", true);
//     xhttp.setRequestHeader("Content-type", "application/json");

//     // Tell our AJAX request how to resolve
//     xhttp.onreadystatechange = () => {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {

//             // Add the new data to the table
//             addRowToTable(xhttp.response);

//             // Clear the input fields for another transaction
//             inputUserID.value = '';
//             inputBookID.value = '';
//         }
//         else if (xhttp.readyState == 4 && xhttp.status != 200) {
//             console.log("There was an error with the input.")
//         }
//     }

//     // Send the request and wait for the response
//     xhttp.send(JSON.stringify(data));

// })

// I THINK THIS WOULD AUTO POPULATE THE TABLE WITHOUT REFRESHING THE PAGE <----------------------------------------
// // Creates a single row from an Object representing a single record from books table
// addRowToTable = (data) => {

//     // Get a reference to the current table on the page and clear it out.
//     let currentTable = document.getElementById("books-table");

//     // Get the location where we should insert the new row (end of table)
//     let newRowIndex = currentTable.rows.length;

//     // Get a reference to the new row from the database query (last object)
//     let parsedData = JSON.parse(data);
//     let newRow = parsedData[parsedData.length - 1]

//     // Create a row and 4 cells
//     let row = document.createElement("TR");
//     let bookIDCell = document.createElement("TD");
//     let titleCell = document.createElement("TD");
//     let authorCell = document.createElement("TD");
//     let wordsCell = document.createElement("TD");

//     let deleteCell = document.createElement("TD");

//     // Fill the cells with correct data
//     bookIDCell.innerText = newRow.bookID;
//     titleCell.innerText = newRow.title;
//     authorCell.innerText = newRow.author;
//     wordsCell.innerText = newRow.words;

//     deleteCell = document.createElement("button");
//     deleteCell.innerHTML = "Delete";
//     deleteCell.onclick = function(){
//         deleteBook(newRow.id);
//     };

//     // Add the cells to the row 
//     row.appendChild(bookIDCell);
//     row.appendChild(titleCell);
//     row.appendChild(authorCell);
//     row.appendChild(wordsCell);
//     row.appendChild(deleteCell);

//     // Add a row attribute so the deleteRow function can find a newly added row
//     row.setAttribute('data-value', newRow.id);
    
//     // Add the row to the table
//     currentTable.appendChild(row);
// }