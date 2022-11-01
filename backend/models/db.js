const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err){ 
        console.log('Connected Successfully to MongoDB Database. :)'); 
    }
    else {
         console.log('Error while connecting to MongoDB Database : ' + JSON.stringify(err, undefined, 2)); 
        }
});

require('./user.model');