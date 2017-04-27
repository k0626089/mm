//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("memo_dba", "0.1", "A Database of Cars I Like", 1024 * 1024);

    //create the cars table using SQL for the database using a transaction
    mydb.transaction(function(t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY ASC, make TEXT, model TEXT, date TEXT)");
    });



} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database

function updateCarList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("carlist");
    var table = document.getElementById("myTableData");

    while ( table.rows.length > 0 )
 {
  table.deleteRow(0);
 }

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);
        var t_row = table.insertRow(i);

        var b1 = '<a href="http://twitter.com/home?status=';
        var b2 = ' (by MM™ the memo application)" class="btn btn-info" role="button"><i class="fa fa-twitter"></i></a>&nbsp;&nbsp;&nbsp;';

        var cell_1 = t_row.insertCell(0);
        cell_1.innerHTML= b1.concat(row.make, " - ", row.model, b2);
        //cell_1.innerHTML += "<a href='javascript:void(0);' onclick='deleteCar(" + row.id + ");'>Delete</a>";
        cell_1.innerHTML += '<a href="javascript:void(0);" onclick="deleteCar(' + row.id + ');" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></a>';

/*
        '<button type="button" class="btn btn-danger" onclick="deleteCar(" + row.id + ");"><span class="glyphicon glyphicon-remove"></button>'
*/

        cell_1.style.height="50px";
        var cell_2 = t_row.insertCell(1);
        cell_2.innerHTML= row.make;
        cell_2.style.height="50px";
        var cell_3 = t_row.insertCell(2)
        cell_3.innerHTML= row.model;
        cell_3.style.height="50px";
        var cell_4 = t_row.insertCell(3)
        cell_4.innerHTML= row.date;
        cell_4.style.height="50px";

        //alert(row.make + row.model);

        //listholder.innerHTML += "<li>" + row.make + " - " + row.model + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.id + ");'>Delete</a>)";

        //addRow2(row.make, row.model);
    }

}

//function to get the list of cars from the database

function outputCars() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function(t) {
            t.executeSql("SELECT * FROM cars", [], updateCarList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database

function addCar() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        var make = document.getElementById("carmake").value;
        var model = document.getElementById("carmodel").value;
        var date = new Date(new Date().getTime()).toLocaleString();

        //Test to ensure that the user has entered both a make and model
        if (make !== "" && model !== "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function(t) {
                t.executeSql("INSERT INTO cars (make, model, date) VALUES (?, ?, ?)", [make, model, date]);
                outputCars();
            });
            clearField()
        } else if(make == "" && model !== ""){
            alert("Title is empty!");
        } else if(make !== "" && model == ""){
            alert("Content is empty!");
        } else {
            alert("Title and Content is empty!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteCar(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function(t) {
            t.executeSql("DELETE FROM cars WHERE id=?", [id], outputCars);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputCars();

function addRow() {
    if(document.getElementById("name").value == '' || document.getElementById("name").value == undefined) {
      alert("Title is empty");
      return false;
    }
    else if(document.getElementById("age").value == '' || document.getElementById("age").value == undefined) {
      alert("Content is empty");
      return false;
    }

    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");
    var d  = new Date(new Date().getTime()).toLocaleString();
    var mstring1 = myName.value;
    var mstring2 = age.value;
    var space = " - "
    var b1 = '<div align="center"><a href="http://twitter.com/home?status=';
    var b2 = ' (by MM™ the memo application)" class="btn btn-info" role="button"><i class="fa fa-twitter"></i></a>&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" onClick="Javacsript:deleteRow(this)"><span class="glyphicon glyphicon-remove"></button></div>';

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell_1 = row.insertCell(0);
    cell_1.innerHTML= b1.concat(mstring1, space, mstring2, b2);
    cell_1.style.height="50px";
    var cell_2 = row.insertCell(1);
    cell_2.innerHTML= myName.value;
    cell_2.style.height="50px";
    var cell_3 = row.insertCell(2)
    cell_3.innerHTML= age.value;
    cell_3.style.height="50px";
    var cell_4 = row.insertCell(3)
    cell_4.innerHTML= d;
    cell_4.style.height="50px";

    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
}

function clearField() {
    document.getElementById('carmake').value = "";
    document.getElementById('carmodel').value = "";
}

function deleteRow(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
}

function addTable() {

    var myTableDiv = document.getElementById("myDynamicTable");

    var table = document.createElement('TABLE');
    table.border='1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);

       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);

}

function load() {

    console.log("Page load finished");

}
