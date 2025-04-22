function deleteBook(bookID) {
    let link = '/delete-userBook-ajax/';
    let data = {
      id: bookID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(bookID);
      }
    });
  }
  
  function deleteRow(bookID){
      let table = document.getElementById("userBooks-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == bookID) {
              table.deleteRow(i);
              break;
         }
      }
  }