const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){

    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            message: "Unauthorized! No token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized! token missing"
        })
    }

    const decodedValue = jwt.verify(token, 'yourSecretkey');
    req.user = decodedValue;

    if(decodedValue){
        next();
    }
    else{
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

}

module.exports = { authMiddleware };