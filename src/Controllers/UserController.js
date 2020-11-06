const objUsers = {};
const objMysqlQueriesUser = require('../MysqlQueries/UserMysqlQueries.js');
//Create user
objUsers.CreateUser = async (req, res) => {
    try {
        //Queries Mysql
        let blnEstadoQuery=await objMysqlQueriesUser.CreateUser(req.body);
        if(blnEstadoQuery){
            res.json({
                Success: true,
                strMensaje: "User Create with success." 
            });
        }else{
            res.json({
                Success: false,
                strMensaje: "Error creating a user." 
            });
        }
    } catch (Error) {
        res.json({
            Success: false, 
            strMensaje: "Error creating a user"
        });
    }
}

module.exports = objUsers;