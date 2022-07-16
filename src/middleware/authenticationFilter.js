const jwt = require('jsonwebtoken');
const ResponseData = require('../data/response.data');
const authenticationFilter = (req, res, next) => {
    console.error("[Authentication Filter]");
    //TODO: verificar se está autenticado
    console.log(req.headers)
    const authorization = req.headers['authorization'];
    if (!authorization){
        return res.status(403).json( new ResponseData(403,"Authorization header is missing.", null) );
    } 
    try {
        token = authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token,process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        console.log(decoded);
    } catch (error){
        return res.status(401).json( new ResponseData(401,"Invalid token.", null) );
    }
    return next();
    }
    
    module.exports = authenticationFilter;