const mongoose = require("mongoose");
const dotenv = require("dotenv");
var debug = require("debug")("server:server");
var http = require("http");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! App Shutting Down..");
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("ETE DB connection successful...");
  });

//----

const port = normalizePort(process.env.PORT || "9000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
server.on("error", onError);
server.on("listening", onListening);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! App Shutting Down..");
  server.close(() => {
    process.exit(1);
  });
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
