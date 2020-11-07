const objUsers = {};
const objMysqlQueriesUser = require('../MysqlQueries/UserMysqlQueries.js');
//Create user
objUsers.CreateUser = async (req, res) => {
    try {
        //Queries Mysql
        let blnEstadoQuery = await objMysqlQueriesUser.CreateUser(req.body);
        if (blnEstadoQuery) {
            res.json({
                Success: true,
                strMensaje: "User Create with success."
            });
        } else {
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
//List User Sellers
objUsers.ListUserSeller = async (req,res) => {
    try {
        //Query
        let strDataQuery = await objMysqlQueriesUser.ListUserSeller();
        if (strDataQuery.Success) {
            res.json({
                Success: true,
                strData: strDataQuery.strData
            });
        } else {
            res.json({
                Success: false,
                strData: strDataQuery.strData
            })
        }
    } catch (Error) {
        res.json({
            Success: false,
            strMensaje: "Error list sellers"
        })
    }
}
module.exports = objUsers;