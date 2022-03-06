const pool = require("./../../../config/database");

module.exports = {
    signUpService: (data, callback) => {
        console.log("signUp service.... " + data);
        pool.query(`insert into users(name,email,password,mobile) values(?,?,?,?)`, [data.name, data.email, data.password, data.mobile],
            (error, results, fields) => {

                console.log("....errr.... " + error);

                if (error)
                    return callback(error)
                else
                    return callback(null, results);

            });

        /*  pool.query('select * from users', [],
             (error, results, fields) => {

                 console.log("signUp service.3... " + data);
                 if (error) {
                     console.log(error);
                 }
                 if (results)
                     console.log(results);


             }); */

    }
};