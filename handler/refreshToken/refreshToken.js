const apiAdapter = require('../../routes/apiAdapter');
const jwt        = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCES_TOKEN_EXPIRED
} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res)=>{
    const {refresh_token, email} = req.body;
    try {
        if(!refresh_token){
            return res.status(400).json({
                status: 'error',
                message: 'refresh token is required'
            });
        }else if(!email){
            return res.status(400).json({
                status: 'error',
                message: 'email is required'
            });
        }
        await api.get('/refresh_tokens', {params: {refresh_token: refresh_token}})

        jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, tokenDecode)=>{
            if(err){
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                });
            }
            const data = tokenDecode.data;
            //check email is the same 
            if(tokenDecode.data.email !== email){
                return res.status(400).json({
                    status: 'error',
                    message: 'email is not valid'
                });
            }
            //create new refresh token
            const token = jwt.sign({data}, JWT_SECRET, {expiresIn: JWT_ACCES_TOKEN_EXPIRED});
            return res.json({
                status: 'success',
                data:{
                    token
                }
            })
        })

    } catch (error) {
        console.log(error.message)
        // if(error.code === 'ECONNREFUSED'){
        //     return res.status(400).json({status: 'error', message: "service user unavailable"});
        // }
        // const {status, data} = error.response;
        // return res.status(status).json(data);
    }
}