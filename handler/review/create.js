const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_COURSE} = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res)=>{
    try {
        const user_id = req.user.data.id;
        const riview = await api.post('/api/reviews', {
         user_id, ...req.body
        });
        return  res.json(riview.data);
    } catch (error) {
        if(error.code === "ECONNREFUSED"){
            return res.status(500).json({status: 'error', message:"service courses unavailable"})
        }
        const {status, data} = error.response;
        return res.status(status).json(data);
    }
}