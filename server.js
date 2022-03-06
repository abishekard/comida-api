const http = require("http");
const app = require("./app");
require("dotenv").config();
const server = http.createServer(app);

server.listen(process.env.APP_PORT, () => {
    console.log("server started");
});