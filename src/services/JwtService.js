const jwt = require('jsonwebtoken')
const User = require ('../models/UserModel')
const dotenv = require('dotenv')
dotenv.config()

const genneralAccessToken = async (payload) => {
    
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '30s'})

    return access_token
}

const genneralRefreshToken = async (payload) => {
    
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '1h'})

    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    
    return new Promise( async(resolve, reject) => {
        
        try {
            
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    
                    console.log('err', err)
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    })    
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token   
                })
            })
            
            
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}