const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const os = require("os");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const homedir = os.homedir();
const caPath =
  process.env.ROOT_CA_PATH ||
  path.resolve(homedir, "Library/Application Support/mkcert/rootCA.pem");
const certPath = path.resolve(__dirname, "./localhost.pem");
const keyPath = path.resolve(__dirname, "./localhost-key.pem");

const httpsOptions = {
  ca: fs.readFileSync(caPath),
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${process.env.PORT}`);
  });
});
