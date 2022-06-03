const {
    getMonthlyDataService,
} = require("../../services/restaurant/statistics.service");
const { check, validationResult } = require("express-validator");
const ValidateMonthlyDataInput = () => {
    return [check("month").notEmpty(), check("year").notEmpty()];
};

const getMonthlyData = (req, res) => {
    console.log("res... " + req.body.month);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array(),
        });
    }

    getMonthlyDataService(req.body.month, req.body.year, (err, results) => {
        if (err) {
            res.status(500).send({
                status: 500,
                message: err,
            });
        } else
            res.status(200).send({
                status: 200,
                data: results,
            });
    });
};

module.exports = { getMonthlyData, ValidateMonthlyDataInput };