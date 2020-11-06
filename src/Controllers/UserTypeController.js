const objUserType={};
const objMysqlQueriesUserType = require('../MysqlQueries/UserTypeMysqlQueries.js');

objUserType.CreateUserType=async(req,res)=>{
    try{
        let blnQuery=await objMysqlQueriesUserType.CreateUserType(req.body);
        if(blnQuery){
            res.json({
                Success:true,
                strMensaje:"UserType create with success"
            })
        }else{
            res.json({
                Success:false,
                strMensaje:"Error creating UserType"
            })
        }
    }catch(Error){
        res.json({
            Success:false,
            strMensaje:"Error creating UserType"
        })
    }
}

module.exports=objUserType;