const uploadImage = require('../utils/storage')

module.exports=(req,res,next)=>{

    if(process.env.NODE_ENV === "production"){
        //if(!req.file) res.status(400).send({message:"no se envio ninguna imagen"})
        if(!req.file) return next();
        const url = uploadImage(req.file)
        req.body.photo= url;
    }else{
        if(!req.file) return next();// para que no se mande status 500
        req.body.photo= `${req.protocol}://${req.host}/${req.file.path}` //en path viene la ubicacion de mi archivo dentro de mi servicio
    }
    next();
}