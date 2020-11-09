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
//Create detail
objOrder.CreateDetail=async(req,res)=>{
    try{
        

        await OrderMysql.CreateDetail(req.body);
        res.json({
            Success:true,
            strMensaje:"Detail add with success"
        })

    }catch(Error){
        console.log(Error)
    }
}
objOrder.ListOrders=async(req,res)=>{
    try{
        let strData=await OrderMysql.ListOrders();
        
        res.json({
            Success:true,
            strData
        })

    }catch(Error){
        console.log(Error);
    }
}

module.exports=objOrder;