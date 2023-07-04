const express = require("express");
const studentsRouter = require("./students.route");

const apiRouter = express.Router();

// Student routes
apiRouter.use("/students", studentsRouter);

module.exports = apiRouter;
