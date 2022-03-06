const { storeFcmService } = require("./../../services/user/fcm.service");

module.exports = {
    storeFcm: (req, res) => {
        storeFcmService(req.body, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    message: "fcm stored",
                });
        });
    },
};