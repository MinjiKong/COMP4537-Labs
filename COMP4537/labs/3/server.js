const http = require('http');
const url = require('url');
const fs = require('fs');
const utils = require('./modules/utils');

http.createServer(function (req, res){
    const q = url.parse(req.url, true);

    if (q.pathname.startsWith('/getDate')) {
        const name = q.query["name"] || "User";
        const message = `<p style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${utils.getDate()}</p>`;
        res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
        res.end(message);
    } else if (q.pathname.startsWith('/writeFile')) {
        const data = q.query["text"];
        fs.appendFile('file.txt', data, (err) => {
            if (err) {
                res.writeHead(404, {'content-Type':'text/html'});
                return res.end("404 - Not Found!");
            } else {
                res.writeHead(200, {'content-Type' : 'text/html'});
                res.end("Successfully appended the text to file.txt");
            }
        });
    } else if (q.pathname.startsWith('/readFile')) {
        const pathArray = q.pathname.split('/');
        const filename = pathArray[2];
        fs.readFile(filename, function (err, data){
            if (err) {
                res.writeHead(404, {'content-Type':'text/html'});
                return res.end(`404 - "${filename}" Not Found!`);
            } else {
                res.writeHead(200, {'content-Type' : 'text/html'});
                res.write(data);
                res.end();
            }
        }) 
    } else {
        res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
        res.end("Welcome! We are Wendy and Matthew.");
    }
}).listen(8000);