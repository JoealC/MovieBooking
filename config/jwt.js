const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.SECRET_KEY
const expiresIn = '1d'

function generateToken(payload){
    return jwt.sign(payload, secretKey, expiresIn)

}

function verifyToken(token){
    try{
        const decode = jwt.verify(token, secretKey)
        return { valid: true, payload: decode}
    }catch(err){
        return{valid: false, err: err.message}
    }
}

module.exports = {generateToken, verifyToken}