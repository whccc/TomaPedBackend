const objCustomer={};
const objMysqlQueriesCustomer=require('../MysqlQueries/CustomerMysqlQueries.js');
//Create customer
objCustomer.CreateCustomer = async (req, res) => {
    try { 
        //Queries Mysql
        let blnEstadoQuery = await objMysqlQueriesCustomer.CreateCustomer(req.body);
        if (blnEstadoQuery) {
            res.json({
                Success: true,
                strMensaje: "Customer Create with success."
            });
        } else {
            res.json({
                Success: false,
                strMensaje: "Error creating a Customer."
            });
        }
    } catch (Error) {
        res.json({
            Success: false,
            strMensaje: "Error creating a Customer"
        });
    }
}
//List customers
objCustomer.ListCustomers = async (req,res) => {
    try {
        //Query
        let strDataQuery = await objMysqlQueriesCustomer.ListCustomers();
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

//Edit customer
objCustomer.EditCustomer = async (req, res) => {
    try { 
        //Queries Mysql
        let blnEstadoQuery = await objMysqlQueriesCustomer.EditCustomer(req.body);
        if (blnEstadoQuery) {
            res.json({
                Success: true,
                strMensaje: "Customer edit with success."
            });
        } else {
            res.json({
                Success: false,
                strMensaje: "Error edit a customer."
            });
        }
    } catch (Error) {
        res.json({
            Success: false,
            strMensaje: "Error edit a customer"
        });
    }
}

module.exports=objCustomer;