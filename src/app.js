const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const routes = require("./routes/v1");
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy } = require("./services/auth-service");
const {
  errorFormatter,
  errorHandler,
  unknownRouteHandler,
} = require("./middlewares/error-middleware");

// set security HTTP headers
app.use(helmet());

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication using passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// api v1 routes
app.use("/api/v1", routes);

// To handle unknown route
app.use(unknownRouteHandler);

// Format error if needed
app.use(errorFormatter);

// handle error
app.use(errorHandler);

module.exports = app;
