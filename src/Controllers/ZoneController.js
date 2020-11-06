const objZone={};
const objZoneMysqlQueries = require('../MysqlQueries/ZoneMysqlQueries.js');
 
//Create zone
//Create user
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
module.exports=objZone;