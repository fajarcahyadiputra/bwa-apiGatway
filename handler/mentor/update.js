const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_COURSE} = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = (req, res)=>{
    try {
        const {id} = req.params;
        const mentor = api.put(`/api/mentors`, req.body);
        return res.json(mentor.data);
    } catch (error) {
        if(error.code === 'ENCOREFFUSED'){
            return res.status(500).json({status: 'error', message: 'service mentors unavailable'});
        }
        const {status, data} =error.response;
        return res.status(status).json(data);
    }
}