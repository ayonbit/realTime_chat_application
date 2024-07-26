//External Dependencies
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
//Internal Dependenies
const {
  notFoundhanler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
//App
const App = express();

//PORT
const PORT = process.env.PORT;

//App middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(morgan("tiny"));
App.disable("x-powered-by"); //hacker less know about the Stack
App.use(cookieParser(process.env.COOKIE_SECRET));
//set view engine
App.set("view engine", "ejs");
// set static folder
App.use(express.static(path.join(__dirname, "public")));

//App route
App.use("/", loginRouter);
App.use("/users", usersRouter);
App.use("/inbox", inboxRouter);

//Error Handling
App.use(notFoundhanler); //404 error handler
App.use(errorHandler); // common error handler

//Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    try {
      //Start Server
      App.listen(PORT, () => {
        console.log("Database Connected!");
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot start the server", error);
    }
  })
  .catch((error) => console.log("Invalid Database Connection!", error));
