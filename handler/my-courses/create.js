const apiAdapter = require('../../routes/apiAdapter');
const {URL_SERVICE_COURSE} = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res)=>{
    try {
        const user_id = req.user.data.id;
        const course_id =  req.body.course_id;
        const myCourses = await api.post('/api/my-courses', {
         user_id, course_id
        });
        return  res.json(myCourses.data);
    } catch (error) {
        if(error.code === "ECONNREFUSED"){
            return res.status(500).json({status: 'error', message:"service courses unavailable"})
        }
        const {status, data} = error.response;
        return res.status(status).json(data);
    }
}