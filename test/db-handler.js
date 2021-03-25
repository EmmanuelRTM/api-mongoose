// vamo a jugar con mongo
const mongoose = require('mongoose');
const {MongoMemoryServer}=require('mongodb-memory-server')
const mongod = new MongoMemoryServer();//creating mong server

const connect = async ()=>{
    const uri = await mongod.getUri()
    const mongooseOptions ={
        useNewUriParser:true,
        autoReconnect: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval:1000
    }
    await mongoose.connect(uri, mongooseOptions)
}
const closeDataBase = async ()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

const clearDataBase = async()=>{
    const collections =mongoose.connection.collection
    for(const key in collections){
        const collection = collections[key]
        await collection.deleteMany()
    }
}

module.exports ={
    connect,
    closeDataBase,
    clearDataBase
}