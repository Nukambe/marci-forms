const express = require("express"); //server
const morgan = require("morgan"); //logging information about server requests/responses
const cors = require("cors"); //Cross-origin resource sharing
const csurf = require("csurf"); //Cross-Site Request Forgery protection
const helmet = require("helmet"); //security middleware
const cookieParser = require("cookie-parser"); //parsing cookies from requests
const { ValidationError } = require("sequelize"); //sequelize error
const { environment } = require("./config"); //current environment
const isProduction = environment === "production";

const routes = require("./routes");
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true,
    },
  })
);
app.use(routes);

//error handlers
app.use((_req, _res, next) => {
  const err = new Error("The requested resource could not be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource could not be found."];
  err.status = 404;
  next(err);
});

//sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((error) => error.message);
    err.title = "Validation error";
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;