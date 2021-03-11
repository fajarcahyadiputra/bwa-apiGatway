const apiAdapter = require('../../routes/apiAdapter');
const jwt        = require('jsonwebtoken');
const {
    URL_SERVICE_USER
} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res)=>{
    try {
        const data = req.user;
        const user = await api.get(`/users/${data.id}`);
        return  res.json(user.data);
    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
            return res.status(400).json({status: 'error', message: 'service unavailable'})
        }
        const{status, data} = error.response;
        return res.status(status).json(data);
    }
}