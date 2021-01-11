let mysql = require("mysql");
let objMysql = {};
const connection = mysql.createConnection({
  host: "b2omspfxdncaepef7ztn-mysql.services.clever-cloud.com",
  user: "usffcgv6vylqezbv",
  password: "KISM2x9cD9jlAekTOCVb",
  database: "b2omspfxdncaepef7ztn",
});
//Conection Mysql
objMysql.MysqlConnection = () => {
  try {
    return connection;
  } catch (error) {
    console.log("d");
  }
};

module.exports = objMysql;
