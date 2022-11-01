require('./config/config');  // exporting confidential file 
require('./models/db'); // database
require('./config/passportConfig'); // for password verification


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsIndex = require('./routes/index.router');
const passport = require('passport');

var app = express();     


//------- configure middleware----------
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(passport.initialize());
app.use('/api', rtsIndex);


//----error handler----------
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message)); // iterateing  all error
        res.status(422).send(valErrors)
    }
});


//-----starting the server--------
app.listen(process.env.PORT, () => console.log(`Server started at port Number : ${process.env.PORT}`));