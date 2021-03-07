const http = require("http");
const url = require("url");
const path = require("path");
const fs = require('fs');

const getRequests = require("./requests/get-task");
const postRequests = require("./requests/submit-task");
const validators = require("./validators/task-payload");

// Make our HTTP server
const server = http.createServer((req, res) => {
  // Parse the request url
  const baseURL = "http://" + req.headers.host + "/";
  const reqUrl = new url.URL(req.url, baseURL).pathname;

  if (reqUrl === "/") {
    const htmlLocation = path.join(__dirname, '/views/index.html');

    const file = fs.readFileSync(htmlLocation, 'utf8');

    res.setHeader("Content-Type", "text/html");
    res.write(file);
    res.end();
  }

  if (reqUrl === '/styles.css') {
    const cssLocation = path.join(__dirname, '/views/styles.css');

    const file = fs.readFileSync(cssLocation, 'utf8');

    res.setHeader("Content-Type", "text/css");
    res.write(file);
    res.end();
  }

  if (reqUrl === '/index.js') {
    const jsLocation = path.join(__dirname, '/views/index.js');

    const file = fs.readFileSync(jsLocation, 'utf8');

    res.setHeader("Content-Type", "text/javascript");
    res.write(file);
    res.end();
  }

  if (reqUrl === "/get-task") {
    if (req.method === "GET") {
      getRequests
        .getTask()
        .then((response) => {
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(response));
          res.end();
        })
        .catch((error) => {
          res.writeHead(error.response.status);
          res.write(error.response.data);
          res.end();
        });
    } else {
      res.writeHead(400);
      res.write("Invalid request type");
      res.end();
    }
  }

  if (reqUrl === "/submit-task") {
    if (req.method === "POST") {
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const { error } = validators.taskPayload.validate(JSON.parse(body));

          if (error) {
            res.writeHead(400);
            res.write(
              "Payload validation failed. Please send the fields id, result"
            );
            res.end();
          }

          postRequests
            .submitTask(JSON.parse(body))
            .then((response) => {
              res.setHeader("Content-Type", "application/json");
              res.write(JSON.stringify(response));
              res.end();
            })
            .catch((error) => {
              res.writeHead(error.response.status);
              res.write(JSON.stringify(error.response.data));
              res.end();
            });
        });
    }
  }
});

// Have the server listen on port 9000
server.listen(9000, () => {

  console.log('Server is listening at port 9000');
});
