const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')
var app = express()
const port = 5000
app.use(express.json())
 
app.use(cors())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
