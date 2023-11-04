import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";


import { dataBaseConnection } from "./database/dbConfig.js";
import { userSignup } from "./routes/userSignup.js";
import { userLogin } from "./routes/userLogin.js";
import { forgotPassword } from "./routes/forgotPassword.js";
import { resetPassword } from "./routes/resetPassword.js";
import { verifyRandomString } from "./routes/verifyRandomString.js";


// var logger = require('morgan');
import { indexRouter } from "./routes/index.js";
import {goldRouter} from "./routes/gold.js";

// var indexRouter = require('./routes/index');
// var goldRouter = require('./routes/gold');

//Configuring the environmental variable
dotenv.config();

//Server Setup
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Database Connection
dataBaseConnection();

//Routes
app.use("/api/user/resetPassword", resetPassword);
app.use("/api/user/verifyRandomString", verifyRandomString);
app.use("/api/user/forgotPassword", forgotPassword);
app.use("/api/user/login", userLogin);
app.use("/api/user/signup", userSignup);

app.use('/', indexRouter);
app.use('/gold_rate', goldRouter);

//  catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Listening the Server
app.listen(PORT, () => {
  console.log(`Server Started in localhost:${PORT}`);
});
