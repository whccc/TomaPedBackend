const objZone={};
const objZoneMysqlQueries = require('../MysqlQueries/ZoneMysqlQueries.js');
 
//Create zone
objZone.CreateZone = async (req, res) => {
    try {
        //Queries Mysql
        let blnEstadoQuery=await objZoneMysqlQueries.CreateZone(req.body);
        if(blnEstadoQuery){
            res.json({
                Success: true,
                strMensaje: "Zone Create with success." 
            });
        }else{
            res.json({
                Success: false,
                strMensaje: "Error creating a Zone." 
            });
        }
    } catch (Error) {
        res.json({
            Success: false, 
            strMensaje: "Error creating a Zone"
        });
    }
}
//List Zones
objZone.ListZones=async(req,res)=>{
    try{
        //Query
        let strDataQuery=await objZoneMysqlQueries.ListZones();
        if(strDataQuery.Success){
            res.json({
                Success:true,
                strData:strDataQuery.strData
            });
        }else{
            res.json({
                Success:false,
                strData:strDataQuery.strData
            }) 
        }
    }catch(Error){
        res.json({
            Success:false,
            strMensaje:"Error list Zones"
        })
    }
}
//Edit user seller
objZone.EditZone = async (req, res) => {
    try { 
        //Queries Mysql
        let blnEstadoQuery = await objZoneMysqlQueries.EditZone(req.body);
        if (blnEstadoQuery) {
            res.json({
                Success: true,
                strMensaje: "Zone edit with success."
            });
        } else {
            res.json({
                Success: false,
                strMensaje: "Error edit a zone."
            });
        }
    } catch (Error) {
        res.json({
            Success: false,
            strMensaje: "Error edit a zone"
        });
    }
}
module.exports=objZone;