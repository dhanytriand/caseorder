'use strict';

module.exports = (app, router) => {
    router.use('/token', app.route("token",'api'))
    router.use('/orders', app.route("orders", 'api'))
}