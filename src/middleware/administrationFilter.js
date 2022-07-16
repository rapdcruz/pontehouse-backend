const ResponseData = require ("../data/response.data");
const administrationFilter = (req, res, next) => {
    console.error("[Administration Filter]");
    if (!req.user) {
        return res.status(401).json( new ResponseData(401,"Invalid token.", null) );
    }
    if (!req.user.isAdmin) {
        return res.status(403).json( new ResponseData(403,"Não é administrador.", null) );
    }
    return next();
}

module.exports = administrationFilter;