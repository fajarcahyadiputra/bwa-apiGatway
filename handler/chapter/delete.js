const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_COURSE} = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res)=>{
    try {
        const {id} = req.params;
        const chapter = await api.delete(`/api/chapters/${id}`);
        return res.json({
            'status': 'success',
            'message': 'chapter deleted'
        });
    } catch (error) {
     if(error.code === "ECONNREFUSED"){
         return res.status(500).json({status: 'error', message: 'serive courses unvailable'})
     }  
     const {status, data} = error.response;
     return res.status(status).json(data); 
    }
}