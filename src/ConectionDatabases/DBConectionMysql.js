let mysql = require('mysql');
let objMysql = {};

//Conection Mysql
objMysql.MysqlConnection = async() => {
    try {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'TomaPed'
        });
        return connection;
    } catch (error) {
        console.log(error)
    }
}

module.exports=objMysql;
