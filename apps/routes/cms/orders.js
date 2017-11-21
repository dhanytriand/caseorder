'use strict'

module.exports = (app, router) => {
    const ordersController = app.controller('cms/orders')

    router.get('/list',ordersController.index)

}