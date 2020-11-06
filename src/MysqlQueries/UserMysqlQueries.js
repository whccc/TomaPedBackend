const objUserMysqlQueries = {};
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');
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
            intIdZone
        } = objUser;
        //Conection Mysql
        let Connection = await objMysql.MysqlConnection();

        //SP_CreateUser
        await new Promise(
            (resolve, reject) => {
                Connection.query(`
                CALL SP_CreateUser('${strDocument}','${strName}',
                '${strLastName}','${strEmail}','${strPassword}',
                '${strPhone}','${strAddress}',${intIdTypeUser},
                ${intIdZone}
                )`, (err, rows) => {
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
module.exports = objUserMysqlQueries;