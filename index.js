const oracleDb = require('oracledb');

oracleDb.outFormat = oracleDb.OUT_FORMAT_OBJECT;

async function fun() {
    let con;

    try {
        con = await oracleDb.getConnection({
            user: "..",
            password: "..",
            connectionString: "host:port/serviceName"
        });

        const data = await con.execute(
            `select * from write Your table name`,
        );

        console.log(data.rows);
    } catch (err) {
        console.log(err);
    }
}

fun();