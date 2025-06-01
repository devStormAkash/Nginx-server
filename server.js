const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  const extName = path.extname(filePath).toLowerCase();
  const mime = {
    ".html": "text/html",
    ".css": "text/css",
    js: "text/javascript",
    ".txt": "text/plain",
    ".png": "image/png",
  };
  const contentType = mime[extName] || "application / octet-stream";
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": " text/html" });
        res.end(`
        <html>
            <head><title>404</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background-color:#f8d7da;">
                <h1 style="color:#721c24; font-family:sans-serif;">404 : File Not Found</h1>
            </body>
        </html>
    `);
      } else {
        res.writeHead(500);
        res.end(`server error : ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`server is listening on the port ${port}`);
});
