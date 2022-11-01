const jwt = require('jsonwebtoken');

// function to verify jwt token that is attached with request from clint
var token;
module.exports.verifyJwtToken = (req, res, next) => { 
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'Unauthorized Access: No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedInfo) => { // 1st perameter is clint side token for matching, 2nd perameter is secret key to check with it
                if (err)
                    return res.status(500).send({ auth: false, message: 'Unauthorized Access: JWT Token authentication is failed.' }); // 500
                else {
                    req._id = decodedInfo._id; // matching by id from client and server after decoding from clint info and token
                    next(); // if all goes good then run next for allowing the orginal request function to handel this request
                }
            }
        )
    }
}