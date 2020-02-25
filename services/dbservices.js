let mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react-assignment"
});



module.exports.updatePosts = (obj) => {
    return new Promise((resolve, reject) => {
        if (obj) {

            con.connect(function (err) {
                if (err) {
                    console.log("error", err);
                }
                let sql = `INSERT INTO posts (id, posts, imagepath, dateAdded) VALUES (NULL, '${obj.posts}', '${obj.imagepath}', CURRENT_TIMESTAMP) `;
                con.query(sql, function (err, result) {
                    if (err) {
                        reject(err);

                    }
                    resolve(1);
                    console.log("1 record inserted, ID: " + result.insertId);
                });
            });


        }
    });


}

module.exports.getPosts = () => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                console.log("error", err);
                //throw err;
            }

            let sql = `select * from posts order by id desc`;
            con.query(sql, function (err, result) {
                if (err) {
                    reject(err);

                }
                console.log("length", result.length);
                resolve(result);
                console.log("1 record inserted, ID: " + result.insertId);
            });
        });



    });


}
