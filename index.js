const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const oracledb = require('oracledb');
oracledb.autoCommit = true; //Commita queries
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = {
    user: "..",
    password: "..",
    connectionString: "host:port/serviceName",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
};


app.get('/find', (req, res) => {
    let users = new Array();
    let connection;
    oracledb.getConnection(dbConfig)
        .then((c) => {
            connection = c;
            return connection.execute("select * from write Your table name");
        })
        .then((result) => {
            result.rows.forEach((elemento) => {
                let user = new Object();
                user.EMPID = elemento[0];
                user.USERNAME = elemento[1];
                user.PASSWORD = elemento[2];
                users.push(user);
            });
            res.status(200).json(users);
        }).then(() => {
            if (connection) {
                connection.close();
            }
        }).catch((error) => {
            res.status(500).json({ message: error.message || "Some error occurred!" });
        });
});



app.get('/find/:userId', (req, res) => {
    let connection;
    let user = new Object();
    oracledb.getConnection(dbConfig)
        .then((c) => {
            connection = c;
            return connection.execute("select * from write Your table name WHERE EMPID = :EMPID ", {
                EMPID: req.params.userId
            });
        })
        .then((result) => {
            result.rows.forEach((elemento) => {
                user.EMPID = elemento[0];
                user.USERNAME = elemento[1];
                user.PASSWORD = elemento[2];
            });
            res.status(200).json(user);
        }).then(() => {
            if (connection) {
                connection.close();
            }
        }).catch((error) => {
            res.status(500).json({ message: error.message || "Some error occurred!" });
        });
});



app.listen(PORT, () => {
    console.log(`http://localhostt:${PORT}`);
});