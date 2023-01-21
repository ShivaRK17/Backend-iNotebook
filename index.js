const connectToMongo = require('./db')
const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
}

app.get('/',(req,res)=>{
    res.status(200).send("hello!!")
})

connectToMongo();
app.use(cors(corsOptions))
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port,()=>{
    console.log("Listening to port at 5000");
})

module.exports = app;