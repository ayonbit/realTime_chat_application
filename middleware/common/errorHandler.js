//dependencies
const createError = require("http-error");

//404 not found handler
function notFoundhanler(req, res, next) {
  next(createError(404, "Requested Content Not Found!"));
}
//default error Handler
function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "devlopment" ? err : { message: err.message };
  res.status(err.status || 500);
  if (res.locals.html) {
    //html response
    res.render("error", {
      title: "Error Page",
    });
  } else {
    //json response
    res.json(res.locals.error);
  }
}

//module exports
module.exports = {
  notFoundhanler,
  errorHandler,
};
