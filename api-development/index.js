const express = require('express');
const app = express();
const connectDb = require('./config/databases')
const cors = require('cors')

connectDb()
const PORT = process.env.PORT
const studentRouter = require('./routes/student.route');



app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors());

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, 
};
 
app.use('/api/students', studentRouter)




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});