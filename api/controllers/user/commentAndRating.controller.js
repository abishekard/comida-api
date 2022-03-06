const {
    getCommentService,
    setCommentService,
} = require("./../../services/user/commentAndRating.service");
module.exports = {
    getComment: (req, res) => {
        getCommentService(req.body.order_id, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: result[0],
                });
        });
    },
    setComment: (req, res) => {
        setCommentService(req.body, (error, result) => {
            if (error)
                res.status(500).send({
                    status: 500,
                    message: error,
                });
            else
                res.status(200).send({
                    status: 200,
                    data: "comment posted",
                });
        });
    },
};