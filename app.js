const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const homeRouter = require('./routes/homeRouter');
const screenRouter = require('./routes/screenRouter');
const mappingRouter = require('./routes/mappingRouter');
const bookingRouter = require('./routes/bookingRouter');
const invoiceRouter = require('./routes/invoiceRouter');
const helpGuideRouter = require('./routes/helpGuideRouter');

const connect = require('./schemas'); // 파일명이 index.js 면 /index 생략 가능하다.
require('dotenv').config();

const app = express();
// connection before middle wares
connect();

// views setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middle wares....
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routers - developer areas
app.use('/', homeRouter);
app.use('/screen', screenRouter);
app.use('/mapping', mappingRouter);
app.use('/booking', bookingRouter);
app.use('/invoice', invoiceRouter);
app.use('/help', helpGuideRouter);

/*
 * send errors - can not found routers
 * 404 error handler
*/
app.use((req, res, next) => {
    res.send('404 Not found');
})

app.listen(3030, () => {
    console.log('server is ready');
})