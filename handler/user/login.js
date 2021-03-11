const apiAdapter = require('../../routes/apiAdapter');
const jwt        = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCES_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

const createJWT = (data, jwt_secret,  expired) =>{
    return jwt.sign({data}, jwt_secret ,{expiresIn: expired});
}

module.exports = async (req, res)=>{
    try {
        const user = await api.post('/users/login', req.body);
        if(user.data){
            const data = user.data.data;
            console.log(data);
            //intergasi jwt
            const token  = createJWT(data, JWT_SECRET, JWT_ACCES_TOKEN_EXPIRED);
            const refreshToken  = createJWT(data, JWT_SECRET_REFRESH_TOKEN, JWT_REFRESH_TOKEN_EXPIRED)
             //create new resfresh token 
            await api.post('/refresh_tokens', {token: refreshToken, user_id: data.id});

            return res.json({
               token: token,
               refreshToken: refreshToken
            });
        }else{
            return res.status(400).json({status: 'error', message: "fail to make request"});
        }
    } catch (error) {
        if(error.code === 'ECONNFUSED'){
            return res.status(400).json({status: 'error', message: "service unavailable"});
        }
        const {status, data} = error.response;
        return res.status(status).json(data);
    }
}