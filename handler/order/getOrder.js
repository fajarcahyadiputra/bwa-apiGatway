const apiAdapter =   require('../../routes/apiAdapter');
const {URL_SERVICE_ORDER} = process.env;
const api = apiAdapter(URL_SERVICE_ORDER);

module.exports = async (req, res)=>{
    try {
        const id = req.user.data.id;
        const order = await api.get(`/api/orders`,{
            params: {user_id: id}
        });
        res.json(order.data);
    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
             res.status(500).json({status: 'error', message: 'service payment order unavailable'});
        }
        const{status, data} = error.response;
        return res.status(status).json(data);
    }
}