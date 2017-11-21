'use strict'

module.exports = (app, router) => {
    const ordersController = app.controller('api/orders')

    router.post('/order_product',ordersController.order_product)
    router.post('/order_confirm',ordersController.order_confirm)
    router.post('/check_customer_data',ordersController.check_customer_data)
    router.post('/check_payment_proof',ordersController.check_payment_proof)


}