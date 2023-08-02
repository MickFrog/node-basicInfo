const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);

  switch (parsedURL.pathname) {
    case "/":
      fs.readFile(`./index.html`, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

    case "/about":
    case "/contact":
      fs.readFile(`.${parsedURL.pathname}.html`, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

    default:
      fs.readFile("./404.html", (err, data) => {
        if (err) {
          console.log(err);
        }
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;
  }
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
