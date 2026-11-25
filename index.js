const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {

    if(req.url === "/favicon.ico") return res.end();

    const logEntry = `${Date.now()}: ${req.url} - New Request Received \n`;

    fs.appendFile("log.txt", logEntry, (err)=>{
        switch(req.url){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("I am Ayush Ranjan");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("server started on port 8000!");
});