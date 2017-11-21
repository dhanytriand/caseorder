'use strict';


module.exports = (app, router) => {
    const controller = app.controller('cms/index')
    router.use('/orders', app.route("orders", 'cms'))
}