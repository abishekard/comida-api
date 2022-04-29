const pool = require("./../../../config/database");

module.exports = {
    signUpService: (data, callback) => {
        console.log("signUp service.... " + data);
        pool.query(
            `insert into partner (name,email,password,mobile) values(?,?,?,?)`, [data.name, data.email, data.password, data.mobile],
            (error, results, fields) => {
                console.log("....errr.... " + error);

                if (error) return callback(error);
                else return callback(null, results);
            }
        );
    },
};