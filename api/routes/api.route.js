const express = require("express");
const studentsRouter = require("./students.route");

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
});

// Student routes
apiRouter.use("/students", studentsRouter);

module.exports = apiRouter;
