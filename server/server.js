const express = require('express')
const http = require('http')
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
app.use(express.json({ type: '*/*', limit: '50mb' }))
app.use(cors())
app.use(passport.initialize());
router(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})




