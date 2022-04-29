const express = require("express");
const pool = require("./config/database");
const userRouter = require("./api/routers/user.router");
const partnerRouter = require("./api/routers/partner.router");
const { sendEmailService } = require("./api/services/sendEmail.service");
const app = express();
const multer = require("multer");
const {
    uploadFoodImageService,
    deleteFoodImageService,
} = require("./api/services/restaurant/firebaseUpload.service");
var storage = multer.memoryStorage();
var upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/partner", partnerRouter);
//app.use("/api/delivery", userRouter);

app.post("/api/mail", (req, res) => {
    sendEmailService(
        "abishek.ard3@gmail.com",
        "OTP for Login",
        "1234 is your otp to login",
        (error, result) => {
            if (error)
                res.status(404).send({
                    status: 404,
                    message: "mail not sent . Mail server error",
                });
            else
                res.status(200).send({
                    status: 200,
                    message: "mail sent",
                });
        }
    );
});

app.get("/api", upload.single("image"), (req, res) => {
    const image = req.file;
    console.log(req.file);
    res.send({ message: "File uploaded successfully.", img: image });
});
app.get("/api/upload", upload.single("image"), (req, res) => {
    console.log(req.file.originalname);
    uploadImageService(req.file, (error, result) => {
        res.status(200).send({
            status: 200,
            image_url: result,
        });
    });
});
app.get("/api/delete", (req, res) => {
    console.log(req.body.url);
    deleteImageService(req.body.url, (error, result) => {
        res.status(200).send({
            status: 200,
            image_url: result,
        });
    });
});

module.exports = app;