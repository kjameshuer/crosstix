const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const passport = require('passport')
const cors = require('cors');
const config = require('../config');
const uri = config.dbUri;

mongoose.connect(uri);

const app = express()
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }))
app.use(cors())
app.use(passport.initialize());
router(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




