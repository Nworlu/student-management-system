const { server, app, express } = require('./server');
const PORT = 3000
const cors = require('cors')
const indexRoute = require('./routes/index');
const {connectDB} = require('./db/connect')
require('dotenv').config()
const morgan = require('morgan')


app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRoute);
app.use(cors())

const Start = async () =>{
    try {
    await server.listen(PORT, ()=>{
        console.log(`Listening on Port : ${PORT}`);
    })
    await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error);
    }
}

Start()