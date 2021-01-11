const objLogin = {};
const LoginMysql = require("../MysqlQueries/LoginMysqlQueries.js");

//Login
objLogin.Login = async (req, res) => {
  try {
    console.log(req.body);
    let strData = await LoginMysql.Login(req.body);
    if (strData.blnLogin == 1) {
      res.json({
        Success: true,
        strDocument: strData.strDocument,
        strName: strData.strName,
        strLastName: strData.strLastName,
        strEmail: strData.strEmail,
        strPhone: strData.strPhone,
        strAddress: strData.strAddress,
        intIdZone: strData.intIdZone,
        intIdTypeUser: strData.intIdTypeUser,
        strDescriptionTypeUser: strData.strDescriptionTypeUser,
      });
    } else {
      res.json({
        Success: false,
        strMensaje: "Error Login",
      });
    }
  } catch (Error) {
    console.log(Error);
  }
};

module.exports = objLogin;
