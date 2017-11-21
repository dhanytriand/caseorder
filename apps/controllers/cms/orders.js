'use strict'
exports.index = (req, res, next) => {
    return bluebird.coroutine(function*(){

        let orders_query = req.queries('orders')

        let all_orders = yield orders_query.get_list_orders(req.db)
        res.render('orders_list',{all_orders: all_orders})
    })().catch(next)
}

exports.view = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let id = req.params.id
        let orders_query = req.queries('orders')

        let orders_data = yield orders_query.get_orders_detail_cms(req.db, id)
        res.render('orders_detail',{orders_data: orders_data})
    })().catch(next)
}