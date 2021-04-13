const express = require('express');
//added depndecy for firebase: npm install @google-cloud/storage firebase multer
const mongoose = require('mongoose');
const multer = require('multer')
const UserController = require('./controllers/UserController');
const app = express();
//const MONGO_URI=`mongodb://db:27017/${process.env.MONGO_NAME}`
const MONGO_URI="mongodb+srv://mario:test123@cluster0.ut8iw.mongodb.net/apimongo?retryWrites=true&w=majority"
const manageFiles= require('./middlewares/manageFiles');
const { PROTOCOL_REGEX } = require('@google-cloud/storage/build/src/storage');
const storage = process.env.NODE_ENV === "production" 
? multer.memoryStorage()
: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})


const mult = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024  // limite de 5 mb
    }
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/uploads',express.static('uploads'))//hacer publicos los archivos del backend para que loe le el frontend

// esta es la conexion a mongo
if(process.env.NODE_ENV !== 'test'){//importante hacer lo del test
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }) // inicia la conexion
}

const db = mongoose.connection // aqui esta guardada el status de la conexion

db.on('error',function(err){ // se va a ejecutar varia veces si encuentra un error en la conexion
    console.log('Connection error', err)
})

db.once('open', function(){ // esto se va a ejecutar una vez y as vez solo cuando se haya completado la conexion
    console.log('Connected to database!!')
})

app.get('/users', UserController.fetch)

app.post('/users',[mult.single('photo'),manageFiles] ,UserController.create
    /*
    if(req.file){ // aqui viene el archivo con todos sus datos que nos manda multer
        const url = await storage(req.file); // aqui subo mi archivo a firbase
        req.body.photo = url // voy a guardar la url de la imagen en BD
    } */
   /* Users.create(req.body).then((user) =>{
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
})}*/

)

app.get('/users/:id', UserController.findOne)

// app.post('/users', async(req,res)=>{ 
//     try{
//      const user = await Users.create(req.body) 
//      return res.status(201).send(user)
//     }catch(error){
//          return res.status(400).send(error)
//     }
// })
app.patch('/users',[mult.single('photo'),manageFiles] ,UserController.update)

app.delete('/users/:id', UserController.remove)


const port = process.env.PORT || 3000

app.listen(port,() =>{
    console.log("Server ready 🚀!!!")
})

//solo prender la consola docker-compose up -d

//docker-compose logs web
//docker-compose up --build -d crea esta madre y activa los containers
//docker-compose logs -f  web va aestar escuchando los logs
//par ahacer test: docker-compose  exec web npm test

module.exports = app;