const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_USER} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports =  async(req, res)=>{
    try {
        const data = req.user;
        const logout = await api.post(`/users/logout`, {user_id: data.id});
        return  res.json(logout.data);
    } catch (error) {
        if(error.code === 'ECONNFUSED'){
            return res.status(400).json({status: 'error', message: "service unavailable"});
        }
        const {status, data} = error.response;
        return res.status(status).json(data);
    }
}