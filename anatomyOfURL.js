const http = require("http");
const fs = require("fs");
const url = require("url");

const myServerURL = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const myUrl = url.parse(req.url, true);

    const logEntry = `${Date.now()} : ${req.url} - New Request Received\n`;

    fs.appendFile("logAnatomy.txt", logEntry, (err) => {

        console.log(myUrl.path);
        console.log(myUrl.pathname);

        switch (myUrl.pathname) {
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                // we will do the database searching here.
                res.end("here are your results for " + search);
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myServerURL.listen(8001, () => {
    console.log("server live at 8001");
});