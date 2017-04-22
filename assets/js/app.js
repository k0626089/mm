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

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell_1 = row.insertCell(0);
    cell_1.innerHTML= '<button type="button" class="btn btn-danger" onClick="Javacsript:deleteRow(this)">DELETE</button>';
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
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
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
