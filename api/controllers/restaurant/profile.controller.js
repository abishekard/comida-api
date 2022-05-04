const {
    getProfileDataService,
} = require("./../../services/restaurant/profile.service");

const getProfileData = (req, res) => {
    const partner_id = req.params.partner_id;
    console.log("par id - " + partner_id);
    getProfileDataService(partner_id, (error, result) => {
        console.log("par id - " + partner_id);
        if (error)
            res.status(400).send({
                status: 400,
                data: error,
            });
        else
            res.status(200).send({
                status: 200,
                data: result,
            });
    });
};

module.exports = { getProfileData };