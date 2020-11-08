const fs = require('fs');
const objHelpers = {};
//GenerarArchivosBase64
objHelpers.DecodeBase64=async(strArchivoBase64,strNombreArchivo)=>{
    try{
        let StrExtension=strArchivoBase64.split(/^(data:application|data:image)\/(png|gif|jpeg|pdf);base64,/)[2];
		var buff = await new Buffer.from(strArchivoBase64
			.replace(/^(data:application|data:image)\/(png|gif|jpeg|pdf);base64,/, ''), 'base64');
		await fs.writeFile(`./Public/Products/${strNombreArchivo}.jpg`, buff, function (err) {
			
		});
    }catch(Error){
        console.log(Error)
    }
}

module.exports = objHelpers;