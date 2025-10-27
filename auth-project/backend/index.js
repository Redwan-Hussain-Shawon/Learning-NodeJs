const  express = require('express'); 
const app = express()
require('dotenv').config()
const connectDB = require('./Model/db')

const PORT = process.env.PORT || 8800
 
connectDB()

app.get('/ping', (req,res) => {
    res.send('PONG')
})



app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})