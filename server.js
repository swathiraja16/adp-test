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
  //variables to setup path to html, js and css files
  const baseURL = "http://" + req.headers.host + "/";
  const reqUrl = new url.URL(req.url, baseURL).pathname;

  //Request URL to get html page and render it
  if (reqUrl === "/") {
    const htmlLocation = path.join(__dirname, '/views/index.html');

    const file = fs.readFileSync(htmlLocation, 'utf8');

    res.setHeader("Content-Type", "text/html");

    res.write(file);
    res.end();
  }

  //Request URL to get CSS styling
  if (reqUrl === '/styles.css') {
    const cssLocation = path.join(__dirname, '/views/styles.css');

    const file = fs.readFileSync(cssLocation, 'utf8');

    res.setHeader("Content-Type", "text/css");
    res.write(file);
    res.end();
  }

  //Request URL to get javascript file
  if (reqUrl === '/index.js') {
    const jsLocation = path.join(__dirname, '/views/index.js');

    const file = fs.readFileSync(jsLocation, 'utf8');

    res.setHeader("Content-Type", "text/javascript");
    res.write(file);
    res.end();
  }

  //GET url get task data in JSON format
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
          //to catch any errors 
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


  //POST url to submit id and result in json format and display appropriate message
  if (reqUrl === "/submit-task") {
    if (req.method === "POST") {
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();

          //function to check if request body is in correct format
          const { error } = validators.taskPayload.validate(JSON.parse(body));

          if (error) {
            //display error message when request body is not in predefined format
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
              //to catch error if there is any 500 or 400 status code error
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
