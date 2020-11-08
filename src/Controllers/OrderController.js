const objOrder={};
const OrderMysql=require('../MysqlQueries/OrderMysqlQueries.js');

//Create order
objOrder.CreateOrder=async(req,res)=>{
    try{
        let strIntOrder=await OrderMysql.CreateOrder(req.body);
        res.json({
            Success:true,
            intIdOrder:strIntOrder.intIdOrder,
            strMensaje:"Order create with success"
        })
    }catch(Error){
        console.log(Error)
    }
}
//Finalize order
objOrder.FinalizeOrder=async(req,res)=>{
    try{
        await OrderMysql.FinalizeOrder(req.body);
        res.json({
            Success:true,
            strMensaje:"Order finalize with success"
        })
    }catch(Error){
        console.log(Error)
    }
}



module.exports=objOrder;