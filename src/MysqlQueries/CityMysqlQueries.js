const objCityMysqlQueries = {};
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');
let blnEstadoQuery = false;

//Create user
objCityMysqlQueries.CreateCity = async (objCity) => {
    try {
        const {
            strDescription,
            intIdZone
        } = objCity;
        //Conection Mysql
        let Connection = await objMysql.MysqlConnection();

        //SP_CreateUser
        await new Promise(
            (resolve, reject) => {
                Connection.query(`
                CALL SP_CreateCity('${strDescription}','${intIdZone}')`, (err, rows) => {
                    //Error
                    if (err) {
                        blnEstadoQuery = false;
                        reject(err);
                    }
                    //Resolve data Mysql
                    blnEstadoQuery = true;
                    resolve(rows);
                })
            });
        //Close connection Mysql 
        Connection.end();    
        return blnEstadoQuery;
    } catch (Error) {
        return false;
    }
}

//List user sellers
objCityMysqlQueries.ListCities = async () => {
    try {
        
        //Connection
        let Connection=await objMysql.MysqlConnection();
        let strDataList=[];
        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_ListCities()`,(err,rows)=>{
                if(err){
                    blnStateQuery=false;
                    reject();
                }
                blnStateQuery=true;
                resolve(rows);
            });
        }).then((strData)=>{
            strDataList=strData[0];
        });
        //Connection close
        Connection.end();

        if(blnStateQuery){
            return {Success:true,strData:strDataList};
        }else{
            return {Success:false,strData:[]}
        }
    } catch (Error) {
        return {Success:false,strData:[]}
    }
}
//Edit user
objCityMysqlQueries.EditCity=async(objCity)=>{
    try {

        const {
            intIdCity,
            strDescription,
            intIdZone
        } = objCity;
        //Conection Mysql
        let Connection = await objMysql.MysqlConnection();

        //SP_CreateUser
        await new Promise(
            (resolve, reject) => {
                Connection.query(`
                CALL SP_EditCity('${intIdCity}','${strDescription}','${intIdZone}')`, (err, rows) => {
                    //Error
                    if (err) {
                        blnEstadoQuery = false;
                        reject(err);
                    }
                    //Resolve data Mysql
                    blnEstadoQuery = true;
                    resolve(rows);
                })
            });
        //Close connection Mysql 
        Connection.end();    
        return blnEstadoQuery;
    } catch (Error) {
        return false;
    }
}
module.exports = objCityMysqlQueries;