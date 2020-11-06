const objUserType ={};
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');
let blnStateQuery=false;
//Create UserType
objUserType.CreateUserType=async(objUserType)=>{
    try{
        const { strDescription }=objUserType;
        //Connection
        let Connection=await objMysql.MysqlConnection();

        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_CreateUserType('${strDescription}')`,
            (err,rows)=>{
                if(err){
                    blnStateQuery=false;
                    reject(err);
                }
                blnStateQuery=true;
                resolve(rows);
            });
        });
        return blnStateQuery;
    }catch(Error){
      return false;
    }
}

module.exports=objUserType;