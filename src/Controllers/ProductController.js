const objProduct={};
const objMysqlQueriesProduct= require('../MysqlQueries/ProductMysqlQueries.js');
const Helpers=require('./Helpers');
//Create product
objProduct.CreateProduct=async(req,res)=>{
    try{
        //Guardando img
        await Helpers.DecodeBase64(req.body.strImgBase64,req.body.intIdProduct);
        //Create product
        await objMysqlQueriesProduct.CreateProduct(req.body);
        res.json({
            Success:true,
            strMensaje:"Product creado con éxito."
        })
    }catch(Error){
        console.log(Error);
    }
}
//List product
objProduct.ListProducts=async(req,res)=>{
    try{
        //Query
        let strDataQuery = await objMysqlQueriesProduct.ListProducts();
        res.json({
            Success: true,
            strData: strDataQuery.strData
        })
    }catch(Error){
        console.log(Error)
    }
}

//Edit Product
objProduct.EditProduct = async (req, res) => {
    try { 
       //Guardando img
        if(req.body.strImgBase64!=null){
            await Helpers.DecodeBase64(req.body.strImgBase64,req.body.intIdProduct);
        }
        //Queries Mysql
        await objMysqlQueriesProduct.EditProduct(req.body);
         res.json({
             Success:true,
             strMensaje:'Product edit with success'
         })   
    } catch (Error) {
       console.log(Error)
    }
}
//Get img
objProduct.GetArchivo = async (req, res) => {
    try {
       res.sendFile(req.params.Img, { root: './Public/Products' });
    } catch (Error) {
        console.log(Error);
    }
}

module.exports=objProduct;