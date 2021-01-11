const objCity = {};
const objMysqlQueriesCity = require("../MysqlQueries/CityMysqlQueries.js");

//Create city
objCity.CreateCity = async (req, res) => {
  try {
    //Queries Mysql
    //
    let blnEstadoQuery = await objMysqlQueriesCity.CreateCity(req.body);
    if (blnEstadoQuery) {
      res.json({
        Success: true,
        strMensaje: "City Create with success.",
      });
    } else {
      res.json({
        Success: false,
        strMensaje: "Error creating a city.",
      });
    }
  } catch (Error) {
    res.json({
      Success: false,
      strMensaje: "Error creating a city",
    });
  }
};
//List cities
objCity.ListCities = async (req, res) => {
  try {
    //Query
    let strDataQuery = await objMysqlQueriesCity.ListCities();
    if (strDataQuery.Success) {
      res.json({
        Success: true,
        strData: strDataQuery.strData,
      });
    } else {
      res.json({
        Success: false,
        strData: strDataQuery.strData,
      });
    }
  } catch (Error) {
    res.json({
      Success: false,
      strMensaje: "Error list cities",
    });
  }
};
//Edit city
objCity.EditCity = async (req, res) => {
  try {
    //Queries Mysql
    let blnEstadoQuery = await objMysqlQueriesCity.EditCity(req.body);
    if (blnEstadoQuery) {
      res.json({
        Success: true,
        strMensaje: "City edit with success.",
      });
    } else {
      res.json({
        Success: false,
        strMensaje: "Error edit a City.",
      });
    }
  } catch (Error) {
    res.json({
      Success: false,
      strMensaje: "Error edit a City",
    });
  }
};
module.exports = objCity;
