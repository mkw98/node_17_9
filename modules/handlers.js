var fs = require('fs');
var formidable = require('formidable'); //zapisuje sobie w zmiennej modul formidable z npm



exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) { //Za pomocą metody .parse() moduł formidable jest w stanie odpowiednio sformułować nadchodzące zapytanie
        fs.renameSync(files.upload.path, "test.png");  //Metoda .renameSync() odpowiada za zmianę nazwy uploadowanego pliku, która kryje się pod kluczem files.upload.path na nazwę test.png i zapisze go na poziomie pliku index.js
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

//zadaniem ponizszej metodybędzie odczytanie obrazka test.png i przekazanie go odpytującemu serwer klientowi.
exports.show = function(request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}



