const objLogin = {};
const objMysql = require("../ConectionDatabases/DBConectionMysql.js");

//Create UserType
objLogin.Login = async (objLogin) => {
  try {
    const { strDocument, strPassword } = objLogin;
    let strDataLogin = null;
    //Connection
    let Connection = await objMysql.MysqlConnection();
    await new Promise((resolve, reject) => {
      Connection.query(
        `CALL SP_Login('${strDocument}','${strPassword}')`,
        (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          strDataLogin = rows[0][0];
          resolve(rows);
        }
      );
    });
    return strDataLogin;
  } catch (Error) {}
};

module.exports = objLogin;
