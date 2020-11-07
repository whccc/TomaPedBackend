const objOrderState ={};
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');
let blnStateQuery=false;
//Create UserType
objOrderState.CreateOrderState=async(objOrderState)=>{
    try{
        const { strDescription }=objOrderState;
        //Connection
        let Connection=await objMysql.MysqlConnection();

        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_CreateOrderState('${strDescription}')`,
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

module.exports=objOrderState;