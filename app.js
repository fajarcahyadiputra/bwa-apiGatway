require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');
const coursesRouter = require('./routes/courses');
const paymentsRouter = require('./routes/payments');
const refreshTokenRouter = require('./routes/refresToken-router');
const mentorRouter = require('./routes/mentors-router');
const chapterRouter = require('./routes/chapter-router');
const lessonRouter = require('./routes/lessons-router');
const imageCourseRouter = require('./routes/imageCourse-router');
const myCourseRouter = require('./routes/myCourses-router');
const reviewRouter = require('./routes/review-router');
const webhookRouter = require('./routes/webhook-router');
const orderRouter = require('./routes/order-router');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false , limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware
const verifyToken = require('./middleware/verifyToken');
const permission = require('./middleware/permission');


app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/media', verifyToken, permission('admin','student') ,mediaRouter);
app.use('/v1/payments', paymentsRouter);
app.use('/v1/courses', coursesRouter);
app.use('/v1/orders', verifyToken , permission('admin','student'),orderRouter);
app.use('/v1/mentors', verifyToken ,permission('admin'),mentorRouter);
app.use('/v1/refresh-token', refreshTokenRouter);
app.use('/v1/chapters', verifyToken, permission('admin') ,chapterRouter);
app.use('/v1/lessons' , verifyToken,permission('admin'),lessonRouter);
app.use('/v1/image-courses' , verifyToken ,permission('admin'),imageCourseRouter);
app.use('/v1/my-courses' , verifyToken , permission('admin','student'),myCourseRouter);
app.use('/v1/reviews' , verifyToken ,permission('admin','student'),reviewRouter);
app.use('/v1/webhook', webhookRouter);

module.exports = app;
