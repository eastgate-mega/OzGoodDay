'use strict';
const paymentRouter = require('./payment'),
cartRouter = require('./cart'),
manageRouter = require('./manage'),
customerRouter = require('./admin'),
indexRouter = require('./index'),
itemRouter  = require('./items')



module.exports = app => {
    app.use('/items', itemRouter);
    app.use('/', customerRouter);
    app.use('/', indexRouter);
    app.use('/payment', paymentRouter);
    app.use('/', cartRouter);
    app.use('/manage', manageRouter);
}