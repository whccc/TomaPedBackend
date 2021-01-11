const objUserMysqlQueries = {};
const objMysql = require("../ConectionDatabases/DBConectionMysql.js");
let blnEstadoQuery = false;

//Create user
objUserMysqlQueries.CreateUser = async (objUser) => {
  try {
    const {
      strDocument,
      strName,
      strLastName,
      strEmail,
      strPassword,
      strPhone,
      strAddress,
      intIdTypeUser,
      intIdZone,
    } = objUser;
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();

    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                CALL SP_CreateUser('${strDocument}','${strName}',
                '${strLastName}','${strEmail}','${strPassword}',
                '${strPhone}','${strAddress}',${intIdTypeUser},
                ${intIdZone}
                )`,
        (err, rows) => {
          //Error
          if (err) {
            blnEstadoQuery = false;
            reject(err);
          }
          //Resolve data Mysql
          blnEstadoQuery = true;
          resolve(rows);
        }
      );
    });
    //Close connection Mysql
    return blnEstadoQuery;
  } catch (Error) {
    return false;
  }
};

//List user sellers
objUserMysqlQueries.ListUserSeller = async () => {
  try {
    //Connection
    let Connection = await objMysql.MysqlConnection();
    let strDataList = [];
    await new Promise((resolve, reject) => {
      Connection.query(`CALL SP_ListSellers()`, (err, rows) => {
        if (err) {
          blnStateQuery = false;
          reject();
        }
        blnStateQuery = true;
        resolve(rows);
      });
    }).then((strData) => {
      strDataList = strData[0];
    });
    //Connection close

    if (blnStateQuery) {
      return { Success: true, strData: strDataList };
    } else {
      return { Success: false, strData: [] };
    }
  } catch (Error) {
    return { Success: false, strData: [] };
  }
};
//Edit user
objUserMysqlQueries.EditUserSeller = async (objUser) => {
  try {
    const {
      strDocument,
      strName,
      strLastName,
      strEmail,
      strPassword,
      strPhone,
      strAddress,
      intIdZone,
    } = objUser;
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();

    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                CALL SP_EditSeller('${strDocument}','${strName}',
                '${strLastName}','${strEmail}','${strPassword}',
                '${strPhone}','${strAddress}',${intIdZone}
                )`,
        (err, rows) => {
          //Error
          if (err) {
            blnEstadoQuery = false;
            reject(err);
          }
          //Resolve data Mysql
          blnEstadoQuery = true;
          resolve(rows);
        }
      );
    });
    //Close connection Mysql
    return blnEstadoQuery;
  } catch (Error) {
    return false;
  }
};

//List user sellers
objUserMysqlQueries.GetNroUsers = async () => {
  try {
    //Connection
    let Connection = await objMysql.MysqlConnection();
    let strDataList = [];
    await new Promise((resolve, reject) => {
      Connection.query(`CALL SP_NroUserCustomerOrder()`, (err, rows) => {
        if (err) {
          blnStateQuery = false;
          reject();
        }
        blnStateQuery = true;
        resolve(rows);
      });
    }).then((strData) => {
      strDataList = strData[0];
    });
    //Connection close
    return { Success: true, strData: strDataList };
  } catch (Error) {
    console.log(Error);
  }
};
module.exports = objUserMysqlQueries;
