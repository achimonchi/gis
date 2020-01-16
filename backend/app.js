// ===============================================================================
// ======================[REQUIRE MODULE]=========================================

const
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    env = require('dotenv'),
    cors = require('cors'),
    db = require('./api/models/db');

const
    coordinateRoutes = require('./api/routes/coordinate.routes')

// ===============================================================================
// ======================[USE MODULE FOR STARTED]=================================

const app = express();
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(upload.array())




app.use('/coordinates', coordinateRoutes)

// app.use('/temp_directories', express.static('temp_directories/'))


module.exports = app;



