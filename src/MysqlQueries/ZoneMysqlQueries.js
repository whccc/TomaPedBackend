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
        Connection.end();
        return blnStateQuery;
    }catch(Error){
      return false;
    }
}
//List Zones
objZone.ListZones=async()=>{
    try{
        //Connection
        let Connection=await objMysql.MysqlConnection();
        let strDataList=[];
        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_ListZones()`,(err,rows)=>{
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
        Connection.end();
        if(blnStateQuery){
            return {Success:true,strData:strDataList};
        }else{
            return {Success:false,strData:[]}
        }
    }catch(Error){
        return {Success:false,strData:[]}
    }
}
//Edit user
objZone.EditZone=async(objZone)=>{
    try {

        const {
            intIdZone,
            strDescription
        } = objZone;
        //Conection Mysql
        let Connection = await objMysql.MysqlConnection();

        //SP_CreateUser
        await new Promise(
            (resolve, reject) => {
                Connection.query(`
                CALL SP_EditZone('${intIdZone}','${strDescription}')`, (err, rows) => {
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
module.exports=objZone;