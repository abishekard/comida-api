const express = require("express");
const pool = require("./config/database");
const userRouter = require("./api/routers/user.router");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/partner", userRouter);
app.use("/api/delivery", userRouter);

app.get("/api", (req, res) => {
    pool.query("select * from users", [], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        if (results) res.send(results);
    });
});

module.exports = app;