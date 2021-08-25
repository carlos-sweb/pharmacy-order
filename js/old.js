
// DataBase 

// En la siguiente línea, puede incluir prefijos de implementación que quiera probar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// No use "var indexedDB = ..." Si no está en una función.
// Por otra parte, puedes necesitar referencias a algun objeto window.IDB*:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca ha prefijado estos objetos, por lo tanto no necesitamos window.mozIDB*)


if (!window.indexedDB) {
    window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
}

// --------------------------------------------------------------------------------
var request = indexedDB.open("pharmacy", 1 );
// --------------------------------------------------------------------------------
request.onerror = function(event) {

  	alert("Database error: " + event.target.errorCode);

};
// --------------------------------------------------------------------------------
request.onsuccess = function( event ){

	db = request.result;

};
// --------------------------------------------------------------------------------
request.onupgradeneeded = function( event ){

  var db = event.target.result;
  // Crea un almacén de objetos (objectStore) para esta base de datos
  var pillStore = db.createObjectStore("pills", { keyPath: "ssn" });
  var shopStore = db.createObjectStore("shop", { keyPath: "ssn" });  	  

  	  pillStore.transaction.oncomplete = function(event) {
			
		var pillObject = db.transaction("pills", "readwrite").objectStore("pills");	
			
			for( i in items ){
				pillObject.add({
					ssn:i,
					name:items[i][0],
					price:items[i][1]
				});
			}


			
  	  }
    



};
// --------------------------------------------------------------------------------