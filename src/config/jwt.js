import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
const secretKey = process.env.SECRET_KEY
const expiresIn = '1d'

export const generateToken= (payload) => {
    return jwt.sign(payload, secretKey, expiresIn)

}

export const verifyToken =(token)=>{
    try{
        const decode = jwt.verify(token, secretKey)
        return { valid: true, payload: decode}
    }catch(err){
        return{valid: false, err: err.message}
    }
}

