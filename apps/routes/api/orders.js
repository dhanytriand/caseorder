'use strict'

module.exports = (app, router) => {
    const ordersController = app.controller('api/orders')

    router.post('/order_product',ordersController.order_product)

}