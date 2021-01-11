const objCustomerMysqlQueries = {};
const objMysql = require("../ConectionDatabases/DBConectionMysql.js");
let blnEstadoQuery = false;

//Create user
objCustomerMysqlQueries.CreateCustomer = async (objCustomer) => {
  try {
    const {
      strDocument,
      strName,
      strLastName,
      strEmail,
      strPhone,
      strAddress,
      intIdCity,
    } = objCustomer;
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();

    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                CALL SP_CreateCustomer('${strDocument}','${strName}',
                '${strLastName}','${strEmail}','${strPhone}','${strAddress}',${intIdCity})`,
        (err, rows) => {
          //Error
          if (err) {
            console.log(err);
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
//List customers
objCustomerMysqlQueries.ListCustomers = async () => {
  try {
    //Connection
    let Connection = await objMysql.MysqlConnection();
    let strDataList = [];
    await new Promise((resolve, reject) => {
      Connection.query(`CALL SP_ListCustomers()`, (err, rows) => {
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
//Edit customer
objCustomerMysqlQueries.EditCustomer = async (objCustomer) => {
  try {
    const {
      strDocument,
      strName,
      strLastName,
      strEmail,
      strPhone,
      strAddress,
      intIdCity,
    } = objCustomer;
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();

    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                CALL SP_EditCustomer('${strDocument}','${strName}',
                '${strLastName}','${strEmail}',
                '${strPhone}','${strAddress}',${intIdCity}
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
module.exports = objCustomerMysqlQueries;
