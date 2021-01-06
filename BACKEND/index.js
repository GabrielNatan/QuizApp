const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const router = require('./routes')
const mongoose = require('mongoose')
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/perguntas',{useNewUrlParser:true,useUnifiedTopology:true})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected database')
});

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, 'uploads')))
const port = 3000


app.listen(port, ()=>console.log('Server running'))