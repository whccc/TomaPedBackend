const objProductMysql = {};
const objMysql = require("../ConectionDatabases/DBConectionMysql.js");
const objProduct = require("../Controllers/ProductController.js");

//Create product
objProductMysql.CreateProduct = async (objProduct) => {
  try {
    const { intIdProduct, strDescription, strPrice } = objProduct;
    //Connection
    let Connection = await objMysql.MysqlConnection();
    await new Promise((resolve, reject) => {
      Connection.query(
        `CALL SP_CreateProduct('${intIdProduct}','${strDescription}','${strPrice}')`,
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  } catch (Error) {
    console.log(Error);
  }
};

//List Products
objProductMysql.ListProducts = async () => {
  try {
    //Connection
    let Connection = await objMysql.MysqlConnection();
    let strDataList = [];
    await new Promise((resolve, reject) => {
      Connection.query(`CALL SP_ListProducts()`, (err, rows) => {
        if (err) {
          reject();
        }
        resolve(rows);
      });
    }).then((strData) => {
      strDataList = strData[0];
    });

    return { strData: strDataList };
  } catch (Error) {
    console.log(Error);
  }
};
//Edit product
objProductMysql.EditProduct = async (objProduct) => {
  try {
    const { intIdProduct, strDescription, strPrice } = objProduct;
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();

    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                CALL SP_EditProduct('${intIdProduct}','${strDescription}','${strPrice}' )`,
        (err, rows) => {
          //Error
          if (err) {
            console.log(err);
            reject(err);
          }
          //Resolve data Mysql
          resolve(rows);
        }
      );
    });
    //Close connection Mysql
  } catch (Error) {
    return false;
  }
};
//GetProduct
objProductMysql.GetProduct = async (intIdProduct) => {
  try {
    //Conection Mysql
    let Connection = await objMysql.MysqlConnection();
    let strData = null;
    //SP_CreateUser
    await new Promise((resolve, reject) => {
      Connection.query(
        `
                    CALL SP_GetProduct('${intIdProduct}')`,
        (err, rows) => {
          //Error
          if (err) {
            reject(err);
          }
          //Resolve data Mysql
          strData = rows[0][0];
          resolve(rows);
        }
      );
    });
    //Close connection Mysql
    return strData;
  } catch (Error) {
    console.log(Error);
  }
};
module.exports = objProductMysql;
