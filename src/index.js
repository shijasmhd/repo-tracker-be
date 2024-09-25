const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./utils/db");

dotenv.config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const exitHandler = async () => {
  await db.$disconnect();
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
