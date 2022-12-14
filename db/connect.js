const mongoose = require('mongoose')

const connect = mongoose.connection;
async function connectDB(uri){
    connect.on('connected', async ()=>{
        console.log('MongoDB Connection Established');
    })
    connect.on('reconnected', async ()=>{
        console.log('MongoDB Connection Restablished');
    })
    connect.on('discnnected', async ()=>{
        console.log('MongoDB Connection Disconnected');
        console.log('Trying to reconnect to Mongo.....');

        setTimeout(()=>{
            mongoose.connect(uri,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000,
            })
        }, 3000)
    });
    connect.on("close", () => {
        console.log("Mongo Connection Closed");
      });
      connect.on("error", (error) => {
        console.log("Mongo Connection ERROR: " + error);
      });

    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}


module.exports = { connectDB }