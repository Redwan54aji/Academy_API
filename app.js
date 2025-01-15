const express = require('express')
const
    connectDB = require('./config/connctdb')
const app = express()
const port = 3000
connectDB();
app.use(express.json());
app.use('/api/user/', require('./router/user.route.js'))
app.use('/api/information/', require('./router/information.route.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))