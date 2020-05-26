const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET || "This is the secret"

module.exports = {
    authenticate,
    tokenGenerator
}

function tokenGenerator(user){
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, jwtKey, options)
}

function authenticate(req, res, next){
    const token = req.get('Authorization')
    if(token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err) return res.status(401).json(err)
            req.decoded = decoded; 
            next()
        })
    } else {
            return res.status(401).json({
                error: 'No token provided, must be set on the authorization header'
            })
    }
}