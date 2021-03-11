const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_COURSE} = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports =async (req, res)=>{
    try {
        const {id} = req.params;
        await api.delete(`api/mentors/${id}`);
        return  res.json({
            status:'success',
            message: 'mentor deleted'
        });
    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error', message: 'service mentors unavailable'});
        }
        const {status, data} = error.response;
        return res.status(status).json(data)
    }
}