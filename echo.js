/*
const http = require('http');

http.createServer((request, response) => {
    let body = [];   //http anfrage wird analysiert
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString(); //wenn keine daten mehr da sind -> umwandeln array -> string
        response.end(body); //String in HHTP-Antwort, Antwort wird beendet
    });
}).listen(8080); // serverobjekt methode listen


response-Methoden für eine HTTP-Antwort
response.writeHead : Statuszeile + Kopfdaten
response.write : Rumpf
response.end : Antwort beenden
*/

const http = require('http');

http.createServer((request, response) => {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', (err) => {
        console.error(err);
    });
    let httpFehler = true;
    if (request.method === 'POST' && request.url === '/echo.js') {
        request.pipe(response); //schickt request wieder zurück an client
        httpFehler = false;
    }

    if (request.method === 'PUT') {
        response.writeHead(200, {'Content-Type' : 'text/html' , 'Accept-Charset' : 'utf-8'} );
        response.write("<!DOCTYPE><html>Hallo PUT</html>");
        response.end();
        httpFehler = false;
    }

    if (httpFehler) {
        // Wenn vorher die HTTP-Antwort beendet wurde, kann sue hier nichtb fortgeführt werden
        response.statusCode = 404;
        response.write("Fehler im Aufruf");
        response.end();

    } /* else {
        response.statusCode = 200;
        response.write("Erfolgreicher Aufruf");
        response.end();
    }
    */
}).listen(8080);