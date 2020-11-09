const objOrder ={};
const { connection } = require('mongoose');
const objMysql = require('../ConectionDatabases/DBConectionMysql.js');

//Create UserType
objOrder.CreateOrder=async(objOrder)=>{
    try{
        const { 
            strDocumentCustomer,
            strDocumentSeller
        }=objOrder;
        let strDataOrder=null;
        //Connection
        let Connection=await objMysql.MysqlConnection();
        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_CreateOrder('${strDocumentSeller}','${strDocumentCustomer}')`,
            (err,rows)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }
                strDataOrder=rows[0][0];
                resolve(rows);
            });
        });
        Connection.end();
        return strDataOrder;
        
    }catch(Error){
      console.log(Error);
    }
}
//FinalizeOrder
objOrder.FinalizeOrder=async(objOrder)=>{
    try{
        const { 
            intIdOrder
        }=objOrder;
        let strDataOrder=null;
        //Connection
        let Connection=await objMysql.MysqlConnection();
        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_FinalOrder('${intIdOrder}')`,
            (err,rows)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }
                resolve(rows);
            });
        });
        connection.end();
    }catch(Error){
        console.log(Error)
    }
}
//CreateDetail
objOrder.CreateDetail=async(objOrderDetail)=>{
    try{
        const { 
            intQuantityOrder,
            intTotalOrder,
            intPriceProduct,
            intIdProductOrder,
            intIdOrderP
        }=objOrderDetail;
        //Connection
        let Connection=await objMysql.MysqlConnection();
        await new Promise((resolve,reject)=>{
            Connection.query(`CALL SP_CreateDetailOrder('${intQuantityOrder}','${intTotalOrder}',
            '${intPriceProduct}','${intIdProductOrder}','${intIdOrderP}')`,
            (err,rows)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }
                resolve(rows);
            });
        });
        Connection.end();
    }catch(Error){
        console.log(Error);
    }
}
module.exports=objOrder;