const objOrderState={};
const objMysqlQueriesOrderState= require('../MysqlQueries/OrderStateMysqlQueries.js');


objOrderState.CreateOrderState=async(req,res)=>{
    try{
        let blnQuery=await objMysqlQueriesOrderState.CreateOrderState(req.body);
        if(blnQuery){
            res.json({
                Success:true,
                strMensaje:"Order state create with success"
            })
        }else{
            res.json({
                Success:false,
                strMensaje:"Error creating Order state"
            })
        }
    }catch(Error){
        res.json({
            Success:false,
            strMensaje:"Error creating Order state"
        })
    }
}


module.exports=objOrderState;