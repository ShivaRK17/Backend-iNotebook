const connectToMongo = require('./db')
const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')
const path = require('path')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use('/', express.static(path.join(__dirname, 'public')))


connectToMongo();
app.use(cors(corsOptions))
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port,()=>{
    console.log("Listening to port at 5000");
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

module.exports = app;