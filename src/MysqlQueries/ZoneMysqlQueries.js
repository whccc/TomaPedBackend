const objZone={};
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');
let blnStateQuery=false;
//Create zone
objZone.CreateZone=async(objZone)=>{
    try{
        const { strDescription }=objZone;
        //Connection
        let Connection=await objMysql.MysqlConnection();

        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_CreateZone('${strDescription}')`,
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



module.exports=objZone;