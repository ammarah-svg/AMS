const express = require('express');
const app = express();
const connect = require('./config/coonectDB')
const handler = require('./handlers/handler')
require('dotenv').config();
require('colors')
const cors = require('cors')



app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(
    cors({
    origin: ["http://localhost:5173"],
    credentials: true,
})
)

connect()

app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'))
app.use(handler);



app.listen(process.env.PORT, () => console.log(`server is running on port:${process.env.PORT.green}`))