'use strict'
exports.index = (req, res, next) => {
    return bluebird.coroutine(function*(){

        res.render('orders_list')
    })().catch(next)
}

exports.orders_list = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let orders_query = req.queries('orders')

        let all_orders = yield orders_query.get_list_orders(req.db)

        
    })().catch(next)
}