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

exports.completed_order = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let param = [
            {
                name: 'order_id',
                rules: [
                    'required','numeric'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let order_query = req.queries('orders')      

        let update_complete = yield order_query.update_orders(req.db, post_data.order_id,{
            status: 'completed'
        }) 
        res.success('success completed orders')
    })().catch(next)
}

exports.shipped_order = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let param = [
            {
                name: 'order_id',
                rules: [
                    'required','numeric'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let order_query = req.queries('orders')      

        let update_complete = yield order_query.update_orders(req.db, post_data.order_id,{
            status: 'shipping'
        }) 
        res.success('success shipping orders')
    })().catch(next)
}

exports.canceled_order = (req, res, next) => {
    return bluebird.coroutine(function*(){
        let param = [
            {
                name: 'order_id',
                rules: [
                    'required','numeric'
                ]
            }
        ]
        req.validate(req, param)
        let post_data = req.body
        let order_query = req.queries('orders')      

        let update_complete = yield order_query.update_orders(req.db, post_data.order_id,{
            status: 'canceled'
        }) 
        res.success('success canceled orders')
    })().catch(next)
}